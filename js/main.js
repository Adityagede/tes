(function(){
  // Ganti dengan nomor WhatsApp bisnis (format internasional tanpa + atau spasi)
  var WA = "6281234567890";

  var nav = document.getElementById("menu"), burger = document.querySelector(".burger");
  burger.addEventListener("click", function(){
    var open = nav.classList.toggle("open");
    burger.setAttribute("aria-expanded", open);
  });
  nav.addEventListener("click", function(e){
    if (e.target.tagName === "A") { nav.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); }
  });

  // Gauge progres: terisi sesuai posisi scroll, label mengikuti tahap
  var fill = document.getElementById("gFill"), label = document.getElementById("gLabel");
  var secs = [].slice.call(document.querySelectorAll("[data-fase]")), ticking = false;
  function update(){
    var max = document.documentElement.scrollHeight - innerHeight;
    var p = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
    fill.style.transform = "scaleY(" + p + ")";
    var fase = secs[0].dataset.fase;
    secs.forEach(function(s){ if (s.getBoundingClientRect().top < innerHeight * .4) fase = s.dataset.fase; });
    label.textContent = "Progres " + Math.round(p * 100) + "% - " + fase;
    ticking = false;
  }
  addEventListener("scroll", function(){ if (!ticking) { ticking = true; requestAnimationFrame(update); } }, {passive:true});
  addEventListener("resize", update); update();

  // Filter proyek
  var btns = document.querySelectorAll(".filter button"), tiles = document.querySelectorAll(".tile");
  btns.forEach(function(b){
    b.addEventListener("click", function(){
      btns.forEach(function(x){ x.setAttribute("aria-pressed", x === b); });
      tiles.forEach(function(t){ t.hidden = b.dataset.f !== "all" && t.dataset.t !== b.dataset.f; });
    });
  });

  // Formulir kontak -> WhatsApp
  var form = document.getElementById("form"), err = document.getElementById("err");
  form.addEventListener("submit", function(e){
    e.preventDefault();
    var d = new FormData(form), nama = d.get("nama").trim(), hp = d.get("hp").trim();
    if (!nama || !hp) { err.textContent = "Isi nama dan nomor WhatsApp agar kami bisa menghubungi Anda."; return; }
    err.textContent = "";
    var teks = "Halo Bali Under Construction, saya " + nama + " (" + hp + ").\n" +
      "Jenis proyek: " + d.get("jenis") + "\n" +
      "Lokasi: " + (d.get("lokasi").trim() || "-") + "\n" +
      "Kebutuhan: " + (d.get("pesan").trim() || "-");
    window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(teks), "_blank", "noopener");
  });

  document.getElementById("yr").textContent = new Date().getFullYear();
})();
