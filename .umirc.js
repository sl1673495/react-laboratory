export default {
  base: '/react-laboratory',
  chainWebpack(memo, { env, webpack }) {
    // 删除 umi 内置插件
    memo.plugins.delete('copy');
  }
}