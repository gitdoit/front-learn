/** 记录每次操作完成后的audioBuffer 每次撤销重做都是直接读数据
 * @typedef {Object} WavesurferEditParams
 * @property {Object} buffer 当前音波图的 audioBuffer,必传
 * @property {Number} maxCount=10  记录操作记录，最多可记录多少条,非必传
 * @property {AudioContext} ac=AudioContext  音频上下文,非必传
 */

function WavesurferEdit(opt) {
	let ac = null; // audioContent
	let currentBuffer = null;
	let currentRegion = null; // 当前选中的region
	let copyData = null; // 复制的音频数据
	let copyDuration = null; // 复制的音频时长
	let operationRecode = []; // 操作记录
	let operationIndex = 0; // 记录当前操作的下标
	let maxCount = null; // 记录操作记录，最多可记录多少条
	let channels = null; // 声道数
	let rate = null; // 采样率
	init();

	/* 初始化 */
	function init() {
		currentBuffer = opt.buffer || {};
		ac = opt.ac || new (window.AudioContext || window.webkitAudioContext)(); // 获取音频上下文
		maxCount = opt.maxCount || 10;
		rate = currentBuffer.sampleRate;
		channels = currentBuffer.numberOfChannels;
		operationRecode.push(currentBuffer); // 操作记录新增当前数据
	}

	/** 复制
	 *  @param {Object} region=currentBuffer 当前选中的区域，必传
	 *  @param {audioBuffer} buffer 当前音波图的 audioBuffer,非必传
	 */
	this.copy = function (region, buffer, isCopy = true) {
		currentRegion = region; // 当前选中区域
		if (!currentRegion) return;
		currentBuffer = buffer || currentBuffer; // 源音频
		let { start, end } = currentRegion; // 获取当前区域的开始结束时间
		let startOffset = (start * rate) >> 0; // 起始位置 = 起始时间 * 采样率
		let endOffset = (end * rate) >> 0; // 结束位置 = 结束时间 * 采样率
		let frameCount = endOffset - startOffset; // 音频帧数 = 结束位置 - 起始位置
		// 创建同样同样声道数、采样率，指定长度的空的AudioBuffer
		let newBuffer = ac.createBuffer(channels, frameCount, rate);
		for (let i = 0; i < channels; i++) {
			// 复制音频
			newBuffer
				.getChannelData(i)
				.set(
					currentBuffer
						.getChannelData(i)
						.slice(startOffset, endOffset)
				);
		}
		// 是否需要复制，默认复制（删除操作不需要复制）
		if (isCopy) {
			copyData = newBuffer;
			copyDuration = end - start;
		}
		return {
			buffer: currentBuffer,
			curIndex: operationIndex,
			maxIndex: operationRecode.length,
			copyData,
			copyLength: newBuffer.length,
		};
	};

	/** 粘贴 做的是覆盖操作，会覆盖指定位置那一部分的音频
	 *  @param {Number} currentTime 当前光标所在时间，必传
	 *  @param {audioBuffer} buffer 当前音波图的 audioBuffer,非必传
	 */
	this.paste = function (currentTime, buffer) {
		if (!copyData) return;
		currentBuffer = buffer || currentBuffer; // 源音频
		let duration = currentBuffer.duration; // 源音频时长
		let copyToStart = (currentTime * rate) >> 0; // 要复制到的目标的开始位置
		let copyToEnd = copyToStart + copyData.length; // 要复制到的目标的结束位置 = 开始位置 + 复制的音频长度
		// 音频帧数差值 =  ( 复制的音频长度 - ( 源音频长度 - 当前光标所在位置为止长度 ) )
		let diffLength = copyData.length - (currentBuffer.length - copyToStart);
		// 音频时长如果大于 当前光标时间点 + 复制的音频时长，音频帧数则同等于源音频帧数，否则等于 源音频帧数 + 音频帧数差值
		let frameCount =
			duration > currentTime + copyDuration
				? currentBuffer.length
				: currentBuffer.length + diffLength;
		// 创建同样同样声道数、采样率，指定长度的空的AudioBuffer
		let newBuffer = ac.createBuffer(channels, frameCount, rate);
		for (let i = 0; i < channels; i++) {
			let before = currentBuffer.getChannelData(i).slice(0, copyToStart); // 复制的音频要插入的时间点的前面部分
			let add = copyData.getChannelData(i).slice(0, copyData.length); // 复制的音频
			let after = currentBuffer.getChannelData(i).slice(copyToEnd); // 复制的音频要插入的时间点的后面部分
			newBuffer.getChannelData(i).set([...before, ...add, ...after]);
		}
		pushRecord(newBuffer);
		return {
			buffer: currentBuffer,
			curIndex: operationIndex,
			maxIndex: operationRecode.length,
			copyData,
		};
	};

	/** 插入 做的是拼接操作，会在指定位置插入新数据，拼接成新的音频
	 *  @param {Number} currentTime 当前光标所在时间，必传
	 *  @param {audioBuffer} buffer 当前音波图的 audioBuffer,非必传
	 */
	this.insert = function (currentTime, buffer) {
		if (!copyData) return;
		currentBuffer = buffer || currentBuffer; // 源音频
		let copyToStart = (currentTime * rate) >> 0; // 要复制到的目标的开始位置
		// 音频帧数等于 源音频长度 + 复制音频长度
		let frameCount = currentBuffer.length + copyData.length;
		// 创建同样采样率、同样声道数量，指定长度的空的AudioBuffer
		let newBuffer = ac.createBuffer(channels, frameCount, rate);
		for (let i = 0; i < channels; i++) {
			let before = currentBuffer.getChannelData(i).slice(0, copyToStart); // 复制的音频要插入的时间点的前面部分
			let add = copyData.getChannelData(i).slice(0, copyData.length); // 复制的音频
			let after = currentBuffer.getChannelData(i).slice(copyToStart); // 复制的音频要插入的时间点的后面部分
			newBuffer.getChannelData(i).set([...before, ...add, ...after]);
		}
		pushRecord(newBuffer);
		return {
			buffer: currentBuffer,
			curIndex: operationIndex,
			maxIndex: operationRecode.length,
			copyData,
		};
	};

	/** 剪切
	 *  @param {Object} region=currentBuffer 当前选中的区域，必传
	 *  @param {audioBuffer} buffer 当前音波图的 audioBuffer,非必传
	 */
	this.cut = function (region, buffer, isCopy = true) {
		currentRegion = region; // 当前选中区域
		if (!currentRegion) return;
		currentBuffer = buffer || currentBuffer; // 源音频
		let copyLength = this.copy(region, buffer, isCopy).copyLength; // 如果是删除 不复制数据 剪切才复制 所以这里用局部变量
		let { start, end } = currentRegion; // 获取当前区域的开始结束时间
		let cutStart = (start * rate) >> 0; // 要剪切的目标的开始位置
		let cutEnd = (end * rate) >> 0; // 要剪切的目标的结束位置
		// 音频帧数 = 源音频长度 - 复制的音频数据长度
		let frameCount = currentBuffer.length - copyLength; // 创建同样采样率、同样声道数量，指定长度的空的AudioBuffer
		let newBuffer = ac.createBuffer(channels, frameCount, rate);
		for (let i = 0; i < channels; i++) {
			let before = currentBuffer.getChannelData(i).slice(0, cutStart); // 复制数据 前面部分
			let after = currentBuffer.getChannelData(i).slice(cutEnd); // 复制数据 后面部分
			newBuffer.getChannelData(i).set([...before, ...after]);
		}
		pushRecord(newBuffer);
		currentRegion = null;
		return {
			buffer: currentBuffer,
			curIndex: operationIndex,
			maxIndex: operationRecode.length,
			copyData,
		};
	};

	/** 删除
	 *  @param {Object} region=currentBuffer 当前选中的区域，必传
	 *  @param {audioBuffer} buffer 当前音波图的 audioBuffer,非必传
	 */
	this.remove = function (region, buffer) {
		// 删除其实就是和剪切一样的操作，只是剪切要复制数据，删除不复制
		return this.cut(region, buffer, false);
	};

	/** 撤销 */
	this.backout = function () {
		if (operationIndex === 0) return; // 第一条记录
		operationIndex > 0 && --operationIndex; //  每次撤销操作后 下标--
		currentBuffer = operationRecode[operationIndex];
		return {
			buffer: currentBuffer,
			curIndex: operationIndex,
			maxIndex: operationRecode.length,
			copyData,
		};
	};

	/** 重做 */
	this.renewal = function () {
		if (operationIndex === operationRecode.length - 1) return; // 已经是最新记录
		operationIndex < maxCount - 1 && ++operationIndex; //  每次重做操作后 下标++  因为下标从0开始 这里-1
		currentBuffer = operationRecode[operationIndex];
		return {
			buffer: currentBuffer,
			curIndex: operationIndex,
			maxIndex: operationRecode.length,
			copyData,
		};
	};

	/* 保存操作记录 */
	function pushRecord(newBuffer) {
		if (operationIndex < operationRecode.length - 1) {
			// 如果撤销后执行了其他操作 则覆盖后面的记录
			operationRecode = operationRecode.slice(0, operationIndex + 1);
		}
		operationIndex < maxCount - 1 && ++operationIndex; //  每次操作后 下标++  因为下标从0开始 这里-1
		// 如果当前记录条数小于 最大存储条数限制 直接push
		if (operationRecode.length < maxCount) {
			operationRecode.push(newBuffer); // 每次操作 把当前的数据push到数组里面保存
		} else {
			// 如果数组的长度大于等于maxOperateCount 则删掉数组第一个元素，再push
			operationRecode.shift();
			operationRecode.push(newBuffer);
		}
		currentBuffer = operationRecode[operationIndex]; // 每次操作后 赋值新的buffer
	}
}
