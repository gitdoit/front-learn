import { RuleItem, Rules, ValidateSource, ValidateOption } from 'async-validator'
interface FormItemRule extends RuleItem {
  trigger?: string;
}
type Validator =(
  rule: Rules,
  value: any,
  callback: (error: string | string[] | void | Error) => void,
  source: ValidateSource,
  options: ValidateOption,
) => void;

// 校验金额
const money: Validator = (rule, value, callback) : void => {
  const floatValue = parseFloat(value)
  if (floatValue.toString() === 'NaN') {
    callback(new Error('请输入数字'))
  } else if (floatValue < 0) {
    callback(new Error('请输入大于零的数字'))
  } else {
    callback()
  }
}
// 校验手机号
const phone : Validator = (rule, value, callback) => {
  const reg = /^1[3-9]\d{9}$/
  if (reg.test(value)) {
    callback()
  } else {
    callback(new Error('请输入有效手机号'))
  }
}
// 不能为空
const notNull : Validator = (rule, value, callback) => {
  if (!value) {
    callback(new Error('此项不能为空！'))
  } else {
    callback()
  }
}
// 身份证
const idNumber: Validator = (rule, value, callback) => {
  const reg = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  if (reg.test(value)) {
    callback()
  } else {
    callback(new Error('请输入有效身份证号'))
  }
}
const rules = {
  notNull (message: string) {
    const msg = message || '此项不能为空'
    return [{ required: true, validator: notNull, message: msg, trigger: 'blur' }]
  },
  money (message: string) {
    const msg = message || '请输入有效数字'
    return [{ required: true, validator: money, message: msg, trigger: 'blur' }]
  },
  phone (message: string) {
    const msg = message || '请输入有效手机号'
    return { required: true, validator: phone, message: msg, trigger: 'blur' }
  },
  area: (message: string) => {
    const msg = message || '请输入有效面积'
    return { required: true, validator: money, message: msg, trigger: 'blur' }
  },
  idNumber: (message: string) => {
    const msg = message || '请输入有效身份证号'
    return { required: true, validator: idNumber, message: msg, trigger: 'blur' }
  }
}

export default rules
