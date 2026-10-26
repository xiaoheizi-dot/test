window.onload = function () {
  console.log(`加载成功!`);

  const username = document.querySelector("#username");
  const email = document.querySelector("#email");
  const pwd = document.querySelector("#pwd");
  const repwd = document.querySelector("#repwd");
  const form = document.querySelector("#regForm");
  const skinBtn = document.querySelector("#skinBtn");
  const tipUser = document.querySelector("#tipUser");
  const tipEmail = document.querySelector("#tipEmail");
  const tipPwd = document.querySelector("#tipPwd");
  const tipRepwd = document.querySelector("#tipRepwd");

  const regUser = /^\w{4,12}$/;
  const regEmail = /^[a-zA-Z0-9_\-\.]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
  const regPwd = /^.{6,20}$/;

  function checkUser() {
    //检查用户名
    const val = username.value.trim();
    if (!val) {
      tipUser.textContent = "用户名不能为空";
      tipUser.className = "tip err";
      return false;
    }
    if (!regUser.test(val)) {
      tipUser.textContent = "用户名需4-12位字母、数字、下划线";
      tipUser.className = "tip err";
      return false;
    }
    tipUser.textContent = "格式正确";
    tipUser.className = "tip ok";
    return true;
  }

  function checkEmail() {
    const val = email.value.trim();
    if (!val) {
      tipEmail.textContent = "邮箱不能为空";
      tipEmail.className = "tip err";
      return false;
    }
    if (!regEmail.test(val)) {
      tipEmail.textContent = "邮箱格式不正确";
      tipEmail.className = "tip err";
      return false;
    }
    tipEmail.textContent = "格式正确";
    tipEmail.className = "tip ok";
    return true;
  }

  function checkPwd() {
    const val = pwd.value.trim();
    if (!val) {
      tipPwd.textContent = "密码不能为空";
      tipPwd.className = "tip err";
      return false;
    }
    if (!regPwd.test(val)) {
      tipPwd.textContent = "密码需6-20位";
      tipPwd.className = "tip err";
      return false;
    }
    tipPwd.textContent = "格式正确";
    tipPwd.className = "tip ok";
    return true;
  }

  function checkRepwd() {
    const val = repwd.value.trim();
    if (!val) {
      tipRepwd.textContent = "请再次输入密码";
      tipRepwd.className = "tip err";
      return false;
    }
    if (val !== pwd.value.trim()) {
      tipRepwd.textContent = "两次输入的密码不一致";
      tipRepwd.className = "tip err";
      return false;
    }
    tipRepwd.textContent = "两次密码一致";
    tipRepwd.className = "tip ok";
    return true;
  }

  username.addEventListener("focus", () => {
    tipUser.textContent = "请输入4-12位字母、数字、下划线";
  });
  username.addEventListener("blur", checkUser);
  email.addEventListener("focus", () => {
    tipEmail.textContent = "请输入正确的邮箱地址";
  });
  email.addEventListener("blur", checkEmail);
  pwd.addEventListener("focus", () => {
    tipPwd.textContent = "密码长度6-20位";
  });
  pwd.addEventListener("blur", checkPwd);
  repwd.addEventListener("focus", () => {
    tipRepwd.textContent = "请再次输入密码";
  });
  repwd.addEventListener("blur", checkRepwd);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const allPass = checkUser() && checkEmail() && checkPwd() && checkRepwd();
    if (!allPass) {
      alert("请根据提示修改错误项后再提交");
      return;
    }
    const sexVal = document.querySelector(`input[name="sex"]:checked`);
    if (!sexVal) {
      alert("请选择性别");
      return;
    }
    const data = {
      username: username.value.trim(),
      email: email.value.trim(),
      pwd: pwd.value.trim(),
      sex: document.querySelector('input[name="sex"]:checked')?.value,
    };
    console.log("注册成功，收集到的数据：", data);
    alert("注册成功！");
    window.location.href = "../lab1_2/主页.html";
  });

  skinBtn.addEventListener("click", () => {
    document.body.classList.toggle("night");
    skinBtn.textContent = document.body.classList.contains("night")
      ? "白天模式"
      : "夜间模式";
  });
};
