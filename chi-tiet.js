// # BẢN HỌC MÃ KANSOU: dòng bắt đầu bằng // # là lời giải thích, không chạy như lệnh.
// # Đọc từng hàm: lấy dữ liệu -> xử lý -> cập nhật giao diện hoặc lưu vào trình duyệt.

/* CHI TIẾT: một mẫu HTML dùng lại cho các anime qua ?id=... */
// # Lấy id anime trong URL; nếu không có id thì minh họa bằng Sakamoto Days.
var idAnime = new URLSearchParams(location.search).get('id') || 'sakamoto-days';
// # Tìm đúng đối tượng anime có id vừa đọc từ địa chỉ.
var animeChiTiet = timAnime(idAnime);
var traLoiId = '';

// # Lấy thông tin anime để điền vào trang, nạp review/bình luận và ghi lịch sử xem.
function hienChiTiet() {
  if (!animeChiTiet) {
    lay('noi-dung').innerHTML = '<div class="container">' + vungTrong('Không tìm thấy anime', 'Bộ phim này chưa có nội dung chi tiết.', 'index.html', 'Về trang chủ') + '</div>';
    return;
  }
  var anime = animeChiTiet;
  // # Đổi chữ trên tab trình duyệt theo tên anime đang xem.
  document.title = anime.title + ' | Kansou';
  lay('ten-anime').textContent = anime.title;
  lay('ten-khac').textContent = anime.nativeTitle;
  lay('poster-chi-tiet').src = anime.detailPoster || anime.poster;
  lay('poster-chi-tiet').alt = 'Poster ' + anime.title;
  lay('cot-truyen').textContent = anime.story || anime.synopsis;
  lay('diem-anime').textContent = '★ ' + (layDiem(anime) || 'Chưa có điểm');
  lay('so-luu').textContent = daLuu(idAnime) ? '♥ Đã lưu' : '♡ Chưa lưu';
  lay('luot-xem').textContent = idAnime === 'sakamoto-days' ? '⌕ 1.238' : '';
  lay('viet-review-anime').href = 'review.html?id=' + encodeURIComponent(idAnime);
  var nen = anime.hero || anime.poster;
  lay('nen-chi-tiet').style.backgroundImage = 'linear-gradient(0deg, #000 0%, #0008 90%), url("' + nen + '")';
  var nhanVat = [];
  for (var i = 0; i < anime.characters.length; i++) { nhanVat.push(anime.characters[i].name); }
  // # Mảng nhãn của các thông tin; mảng giaTri bên dưới phải cùng thứ tự.
  var nhan = ['Tác giả', 'Studio', 'Năm phát hành', 'Quốc gia', 'Số tập', 'Nhân vật chính'];
  var giaTri = [anime.author, anime.studio, anime.year, anime.country, anime.episodes, nhanVat.join(', ')];
  var html = '';
  for (var i = 0; i < nhan.length; i++) { html += '<dt>' + nhan[i] + ': </dt><dd>' + anToan(giaTri[i]) + '</dd>'; }
  lay('gioi-thieu-anime').innerHTML = html;
  html = '';
  for (var i = 0; i < Math.min(4, anime.genres.length); i++) { html += '<span>' + anToan(anime.genres[i]) + '</span>'; }
  lay('nhan-the-loai').innerHTML = html;
  capNhatNutLuu();
  hienThongTinMoRong();
  hienBinhLuan();
  hienReviewCongDong();

  // # Tạo tối đa 5 gợi ý khác anime đang xem; đây là gợi ý đơn giản từ thư viện.
  var lienQuan = [];
  var tatCa = tatCaAnime();
  for (var i = 0; i < tatCa.length && lienQuan.length < 5; i++) {
    if (tatCa[i].id !== idAnime) { lienQuan.push(tatCa[i]); }
  }
  hienDanhSach('anime-lien-quan', lienQuan);
  var nguoi = nguoiDangNhap();
  if (nguoi) {
    var lichSu = [];
    for (var i = 0; i < nguoi.lichSu.length; i++) {
      if (nguoi.lichSu[i] !== idAnime) { lichSu.push(nguoi.lichSu[i]); }
    }
    // # Đưa anime hiện tại lên đầu lịch sử, không lặp id và giữ tối đa 30 mục.
    nguoi.lichSu = [idAnime].concat(lichSu).slice(0, 30);
    try { capNhatNguoiDung(nguoi); } catch (loi) { thongBao(loi.message, true); }
  } else {
    // # Chưa đăng nhập thì không cho gõ bình luận và hiện lời mời đăng nhập.
    lay('binh-luan').readOnly = true;
    lay('binh-luan').placeholder = '';
    lay('yeu-cau-dang-nhap').innerHTML = 'Vui lòng <a href="dang-nhap.html" id="dang-nhap-binh-luan">đăng nhập</a> để tham gia bình luận.';
    lay('dang-nhap-binh-luan').onclick = function (e) { e.preventDefault(); canDangNhap(); };
  }
}

// # Đổi chữ và màu nút tim cho khớp trạng thái đã lưu hoặc chưa lưu.
function capNhatNutLuu() {
  var luu = daLuu(idAnime);
  lay('luu-anime').textContent = luu ? '♥ Đã lưu' : '♡ Nhấn để lưu';
  lay('luu-anime').className = luu ? 'save-button saved' : 'save-button';
  lay('so-luu').textContent = luu ? '♥ Đã lưu' : '♡ Chưa lưu';
}

// # Ghép phần phân tích, nhân vật, nguyên tác và các liên kết nguồn tham khảo.
function hienThongTinMoRong() {
  var anime = animeChiTiet;
  var html = '<h3>Phân tích anime</h3><p>' + anToan(anime.analysis || 'Nội dung giới thiệu theo nguồn chính thức.') + '</p>';
  html += '<h3>Thuộc tính nhân vật</h3><ul>';
  for (var i = 0; i < anime.characters.length; i++) {
    var nv = anime.characters[i];
    html += '<li><strong>' + anToan(nv.name) + '</strong> — ' + anToan(nv.role + ': ' + nv.traits) + '</li>';
  }
  html += '</ul><h3>Cặp đôi và quan hệ</h3><p>' + anToan(anime.relationships) + '</p>';
  html += '<h3>Nguyên tác và phiên bản</h3><p>' + anToan(anime.originalStatus) + '<br>Số chương: ' + anToan(anime.chapters) + '<br>Số tập truyện: ' + anToan(anime.volumes) + '</p><p>' + anToan(anime.versions) + '</p>';
  html += '<h3>Thẻ chủ đề</h3><p>' + anToan(anime.themes.join(', ')) + '</p><h3>Nguồn tham khảo</h3><div class="source-links">';
  for (var i = 0; i < anime.sources.length; i++) {
    html += '<a href="' + anToan(anime.sources[i].url) + '" target="_blank" rel="noopener">' + anToan(anime.sources[i].label) + ' ↗</a>';
  }
  lay('thong-tin-mo-rong').innerHTML = html + '</div>';
}

// # Lọc bình luận theo animeId, đếm số bình luận và hiển thị; mẫu Figma được ghi rõ.
function hienBinhLuan() {
  var danhSach = docKho().binhLuan;
  var html = '';
  var dem = 0;
  // # Giữ bình luận mẫu trên màn hình Figma của Sakamoto Days; đây không phải dữ liệu thật.
  if (idAnime === 'sakamoto-days') {
    html = '<p class="comment"><strong>chumeo67:</strong> Mình cũng thấy bộ này hay ghê á nhân vật nào cũng đẹp trai</p><p class="comment"><strong>echopechop00:</strong> baoh ra ss2 v mn?</p><p class="comment reply">↳ <strong>hongtrangogia:</strong> tháng 1/2027 nha b.</p><p class="muted comment-meta">Bình luận mẫu giữ theo Figma.</p>';
    dem = 3;
  }
  for (var i = 0; i < danhSach.length; i++) {
    var bl = danhSach[i];
    if (bl.animeId === idAnime) {
      dem++;
      html += '<div class="comment' + (bl.traLoi ? ' reply' : '') + '"><strong>' + anToan(bl.ten) + ':</strong> ' + anToan(bl.noiDung) + '<div class="comment-meta">' + new Date(bl.ngay).toLocaleDateString('vi-VN');
      if (nguoiDangNhap()) { html += ' · <button class="text-button" data-tra-loi="' + bl.id + '" data-ten="' + anToan(bl.ten) + '">Trả lời</button>'; }
      html += '</div></div>';
    }
  }
  if (!dem) { html = '<p class="muted">Chưa có bình luận. Hãy chia sẻ cảm nhận đầu tiên.</p>'; }
  lay('tieu-de-binh-luan').textContent = 'Bình luận (' + dem + ')';
  lay('danh-sach-binh-luan').innerHTML = html;
}

// # Chỉ lấy review của anime hiện tại để hiện tên người viết, sao và nội dung.
function hienReviewCongDong() {
  var reviews = docKho().reviews;
  var html = '';
  for (var i = 0; i < reviews.length; i++) {
    var rv = reviews[i];
    if (rv.animeId === idAnime) {
      html += '<article class="review-item"><div class="review-meta"><strong>' + anToan(rv.ten) + '</strong><span>' + new Date(rv.ngay).toLocaleDateString('vi-VN') + '</span></div><span class="score">★ ' + rv.diem + '/5</span><p>' + anToan(rv.noiDung) + '</p></article>';
    }
  }
  lay('review-cong-dong').innerHTML = html ? '<h2>Review cộng đồng</h2>' + html : '';
}

if (animeChiTiet) {
  // # Bấm tim ở trang chi tiết để lưu/bỏ lưu rồi cập nhật lại nút.
  lay('luu-anime').onclick = function () {
    try { doiTrangThaiLuu(idAnime); capNhatNutLuu(); } catch (loi) { thongBao(loi.message, true); }
  };
  // # Hiện số ký tự đang nhập trong ô bình luận.
  lay('binh-luan').oninput = function () { lay('dem-ky-tu').textContent = this.value.length; };
  // # Bắt nút Trả lời, nhớ id bình luận gốc và chèn @tên vào ô nhập.
  lay('danh-sach-binh-luan').onclick = function (suKien) {
    var nut = suKien.target.closest('[data-tra-loi]');
    if (nut) {
      traLoiId = nut.dataset.traLoi;
      lay('binh-luan').value = '@' + nut.dataset.ten + ' ';
      lay('binh-luan').focus();
      lay('dem-ky-tu').textContent = lay('binh-luan').value.length;
    }
  };
  // # Kiểm tra đăng nhập và độ dài bình luận, ghi kho rồi hiển thị lại danh sách.
  lay('form-binh-luan').onsubmit = function (suKien) {
    suKien.preventDefault();
    if (!canDangNhap()) { return; }
    var noiDung = lay('binh-luan').value.trim();
    if (!noiDung || noiDung.length > 1000) { lay('loi-binh-luan').textContent = 'Bình luận cần từ 1 đến 1000 ký tự.'; return; }
    try {
      var nguoi = nguoiDangNhap();
      var kho = docKho();
      // # Tạo một bình luận mới gồm id anime, id người viết, nội dung, trả lời và thời gian.
      kho.binhLuan.push({ id: taoMa(), animeId: idAnime, nguoiId: nguoi.id, ten: nguoi.ten, noiDung: noiDung, traLoi: traLoiId, ngay: new Date().toISOString() });
      luuKho(kho);
      this.reset(); traLoiId = ''; lay('dem-ky-tu').textContent = '0'; lay('loi-binh-luan').textContent = '';
      hienBinhLuan(); thongBao('Đã gửi bình luận.');
    } catch (loi) { lay('loi-binh-luan').textContent = loi.message; }
  };
}
hienChiTiet();
