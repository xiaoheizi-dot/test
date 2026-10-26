const title1Dom = document.getElementById("post-title1");
if (title1Dom && articles.length > 0) {
  const firstPost = articles[0];
  // 把data里的内容填到对应元素
  document.getElementById("post-title1").textContent = firstPost.title;
  document.getElementById("post-info1").textContent = firstPost.info;
  document.getElementById("post-desc1").textContent = firstPost.desc;
}
