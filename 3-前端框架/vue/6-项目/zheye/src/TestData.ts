/**
 * 文章
 */
export interface PostProps {
  id: number;
  title: string;
  content: string;
  image ?: string;
  createAt: string;
  topicId: number;
}
/**
 * 专栏
 */
export interface ColumnProps {
  id: number;
  title: string;
  avatar ?: string;
  description: string;
}
export const columnsData : ColumnProps[] = [
  {
    id: 1,
    title: '时事新闻',
    avatar: '../assets/svg/news.svg',
    description: '海量新鲜的国内新闻,实时更新!'
  }
]

export const postsData : PostProps[] = [
  {
    id: 1,
    title: '滴滴被审查,到底是人性的扭曲还是道德的沦丧',
    content: '新京报贝壳财经讯（记者 陈维城）有消息称，滴滴赴美上市将国内道路信息打包送出。7月3日，滴滴副总裁李敏回应称，看到网上有人恶意造谣说“滴滴在海外上市，把数据打包交给美国”。和众多在海外上市的中国企业一样，滴滴国内用户的数据都存放在国内服务器，绝无可能把数据交给美国。另外，相关恶意造谣者虽然已经主动删帖，但我们坚决起诉维权',
    image: 'https://static01.nyt.com/images/2021/06/30/business/30didi/merlin_185466567_649a59eb-e309-428f-a924-262ca0dbbb7a-master1050.jpg',
    createAt: '2021-06-12 09:11:12',
    topicId: 1
  },
  {
    id: 2,
    title: '滴滴被审查,到底是人性的扭曲还是道德的沦丧',
    content: '新京报贝壳财经讯（记者 陈维城）有消息称，滴滴赴美上市将国内道路信息打包送出。7月3日，滴滴副总裁李敏回应称，看到网上有人恶意造谣说“滴滴在海外上市，把数据打包交给美国”。和众多在海外上市的中国企业一样，滴滴国内用户的数据都存放在国内服务器，绝无可能把数据交给美国。另外，相关恶意造谣者虽然已经主动删帖，但我们坚决起诉维权',
    image: 'https://static01.nyt.com/images/2021/06/30/business/30didi/merlin_185466567_649a59eb-e309-428f-a924-262ca0dbbb7a-master1050.jpg',
    createAt: '2021-06-12 09:11:12',
    topicId: 1
  },
  {
    id: 3,
    title: '滴滴被审查,到底是人性的扭曲还是道德的沦丧',
    content: '新京报贝壳财经讯（记者 陈维城）有消息称，滴滴赴美上市将国内道路信息打包送出。7月3日，滴滴副总裁李敏回应称，看到网上有人恶意造谣说“滴滴在海外上市，把数据打包交给美国”。和众多在海外上市的中国企业一样，滴滴国内用户的数据都存放在国内服务器，绝无可能把数据交给美国。另外，相关恶意造谣者虽然已经主动删帖，但我们坚决起诉维权',
    image: 'https://static01.nyt.com/images/2021/06/30/business/30didi/merlin_185466567_649a59eb-e309-428f-a924-262ca0dbbb7a-master1050.jpg',
    createAt: '2021-06-12 09:11:12',
    topicId: 1
  }
]
