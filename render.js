function saveToLocal(key, value) {
  const str = JSON.stringify(value);
  localStorage.setItem(key, str);
}

function getFromLocal(key) {
  const str = localStorage.getItem(key);
  if (!str) return [];
  return JSON.parse(str);
}

window.onload = () => {
  // 夜间模式
  const skinBtn = document.getElementById("skinBtn");
  skinBtn.addEventListener("click", () => {
    document.body.classList.toggle("night");
    skinBtn.textContent = document.body.classList.contains("night")
      ? "白天模式"
      : "夜间模式";
  });

  // 识别当前页面
  const getUrlParam = (name) => new URLSearchParams(location.search).get(name);

  // ========== 首页 ==========
  //封装渲染函数，接收文章数组
  function renderData(list) {
    const postCountEl = document.querySelector(".item-count");
    const postWrapEl = document.querySelector(".item");
    if (!postWrapEl) return;

    if (list.length === 0) {
      postWrapEl.innerHTML = "<p>暂无文章</p>";
      postCountEl.textContent = "共 0 篇";
      return;
    }

    let str = "";
    for (const item of list) {
      str += `
      <article class="post-card">
        <h3 class="post-title">${item.title}</h3>
        <div class="post-info">${item.date}</div>
        <p class="post-desc">${item.desc}</p>
        <a href="person.html?title=${encodeURIComponent(item.title)}" class="read-more">阅读全文 →</a>
      </article>
    `;
    }
    postCountEl.textContent = `共 ${list.length} 篇`;
    postWrapEl.innerHTML = str;
  }

  const postWrapEl = document.querySelector(".item");
  if (postWrapEl) {
    renderData(articleList); //渲染全部文章
  }

  // ========== 详情页 ==========
  const articleBoxEl = document.querySelector(".article-content");
  if (articleBoxEl) {
    const targetTitle = getUrlParam("title");
    const currArticle = articleList.find((art) => art.title === targetTitle);
    articleBoxEl.innerHTML = currArticle
      ? `<h2 class="post-title">${currArticle.title}</h2>
         <div class="post-info">${currArticle.date}</div>
         <p class="post-desc">${currArticle.desc}</p>`
      : `<p>没有找到这篇文章</p>`;
  }

  // ========== 搜索 ==========
  const searchBox = document.querySelector("#searchBox");
  const searchBtn = document.querySelector("#searchBtn");
  const resetBtn = document.querySelector("#resetBtn");

  if (searchBox && searchBtn && resetBtn) {
    searchBtn.addEventListener("click", () => {
      const keyword = searchBox.value.trim().toLowerCase();
      const result = articleList.filter((item) =>
        item.title.toLowerCase().includes(keyword)
      );
      renderData(result);
    });

    resetBtn.addEventListener("click", () => {
      searchBox.value = "";
      renderData(articleList);
    });
  }

  // ========== 留言 ==========
  const commentForm = document.querySelector("#commentForm");
  const nicknameEl = document.querySelector("#nickname");
  const contentEl = document.querySelector("#commentContent");
  const msgTotalEl = document.querySelector("#msgTotal");
  const msgListEl = document.querySelector("#msgList");

  if (commentForm && msgListEl) {
    messages = getFromLocal("blog_messages");

    function renderMessage() {
      msgListEl.innerHTML = "";
      msgTotalEl.textContent = `共 ${messages.length} 条留言`;

      for (const msg of messages) {
        const li = document.createElement("li");
        const nameSpan = document.createElement("span");
        nameSpan.textContent = `昵称：${msg.username}`;

        const contentP = document.createElement("p");
        contentP.textContent = msg.content;

        const delBtn = document.createElement("button");
        delBtn.textContent = "删除";
        delBtn.dataset.mid = msg.messageId;
        delBtn.addEventListener("click", function () {
          if (!confirm("确定删除这条留言吗？")) return;
          const delId = Number(this.dataset.mid);
          messages = messages.filter((item) => item.messageId !== delId);

          saveToLocal("blog_messages", messages);
          renderMessage();
        });

        li.append(nameSpan, contentP, delBtn);
        msgListEl.append(li);
      }
    }

    // 表单提交
    commentForm.addEventListener("submit", (e) => {
      e.preventDefault(); // 阻止表单刷新

      const username = nicknameEl.value.trim();
      const content = contentEl.value.trim();

      // 非空校验
      if (!username) return alert("请输入昵称");
      if (!content) return alert("请输入留言内容");

      const newMsg = {
        messageId: msgId,
        username,
        content,
      };
      msgId++;
      messages.push(newMsg);

      saveToLocal("blog_messages", messages);

      renderMessage();

      nicknameEl.value = "";
      contentEl.value = "";
    });

    renderMessage();
  }
};
