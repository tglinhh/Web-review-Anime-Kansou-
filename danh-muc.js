// # BẢN HỌC MÃ KANSOU: dòng bắt đầu bằng // # là lời giải thích, không chạy như lệnh.
// # Đọc từng hàm: lấy dữ liệu -> xử lý -> cập nhật giao diện hoặc lưu vào trình duyệt.

/* DANH MỤC: dùng vòng lặp và if để kết hợp các điều kiện lọc. */
// # Đọc phần sau dấu ? trong URL, ví dụ ?q=sakamoto.
var thamSo = new URLSearchParams(location.search);
var tuKhoaDanhMuc = thamSo.get('q') || '';
var nhomMoi = thamSo.get('nhom') === 'moi';

// # Tạo thẻ option cho ô select, bỏ qua giá trị đã có để không lặp lựa chọn.
function themLuaChon(id, danhSach) {
  var daThem = [];
  for (var i = 0; i < danhSach.length; i++) {
    var giaTri = String(danhSach[i]);
    if (daThem.indexOf(giaTri) === -1) {
      var luaChon = document.createElement('option');
      luaChon.value = giaTri;
      luaChon.textContent = giaTri;
      lay(id).appendChild(luaChon);
      daThem.push(giaTri);
    }
  }
}

// # Ba mảng tạm để gom thể loại, năm và studio thành các lựa chọn lọc.
var theLoai = [], nam = [], studio = [];
var tatCa = tatCaAnime();
for (var i = 0; i < tatCa.length; i++) {
  theLoai = theLoai.concat(tatCa[i].genres);
  nam.push(tatCa[i].year);
  studio.push(tatCa[i].studio);
}
// # Sắp xếp chữ rồi tạo các lựa chọn thể loại trong ô select.
themLuaChon('loc-the-loai', theLoai.sort());
themLuaChon('loc-nam', nam.sort().reverse());
themLuaChon('loc-studio', studio.sort());

// # Duyệt anime, kiểm tra tất cả điều kiện lọc, sắp xếp rồi hiển thị kết quả.
function hienKetQua() {
  var ketQua = [];
  var danhSach = tatCaAnime();
  for (var i = 0; i < danhSach.length; i++) {
    var anime = danhSach[i];
    var hopLe = true;
    var chuoiTim = anime.title + ' ' + anime.nativeTitle + ' ' + anime.author + ' ' + anime.genres.join(' ');
    for (var j = 0; j < anime.characters.length; j++) { chuoiTim += ' ' + anime.characters[j].name; }
    // # Nếu tên/tác giả/nhân vật không chứa từ khóa sau khi bỏ dấu, loại anime này.
    if (tuKhoaDanhMuc && !boDau(chuoiTim).includes(boDau(tuKhoaDanhMuc))) { hopLe = false; }
    // # Khi mở từ Xem tất cả của mục mới thêm, chỉ lấy đúng 4 anime của nhóm đó.
    if (nhomMoi && ['chainsaw-man', 'kimi-ni-todoke', 'my-hero-academia', 'hunter-x-hunter'].indexOf(anime.id) === -1) { hopLe = false; }
    // # Điều kiện lọc thể loại: có chọn thì anime phải chứa thể loại đó.
    if (lay('loc-the-loai').value && anime.genres.indexOf(lay('loc-the-loai').value) === -1) { hopLe = false; }
    // # Điều kiện lọc năm: chuyển năm thành chuỗi để so sánh với giá trị trong select.
    if (lay('loc-nam').value && String(anime.year) !== lay('loc-nam').value) { hopLe = false; }
    // # Điều kiện lọc mùa phát hành: Xuân, Hè, Thu hoặc Đông.
    if (lay('loc-mua').value && anime.season !== lay('loc-mua').value) { hopLe = false; }
    // # Điều kiện lọc loại phim: TV hoặc Movie.
    if (lay('loc-loai').value && anime.type !== lay('loc-loai').value) { hopLe = false; }
    // # Điều kiện lọc quốc gia sản xuất.
    if (lay('loc-nuoc').value && anime.country !== lay('loc-nuoc').value) { hopLe = false; }
    // # Điều kiện lọc studio sản xuất.
    if (lay('loc-studio').value && anime.studio !== lay('loc-studio').value) { hopLe = false; }
    // # Chỉ đưa anime đáp ứng tất cả điều kiện vào mảng kết quả.
    if (hopLe) { ketQua.push(anime); }
  }
  var cachXep = lay('sap-xep').value;
  // # Sắp xếp mảng theo tên, điểm hoặc năm trước khi dựng thẻ poster.
  ketQua.sort(function (a, b) {
    if (cachXep === 'az') { return a.title.localeCompare(b.title); }
    if (cachXep === 'za') { return b.title.localeCompare(a.title); }
    if (cachXep === 'diem') { return Number(layDiem(b)) - Number(layDiem(a)); }
    return b.year - a.year;
  });
  lay('vung-ket-qua').hidden = false;
  lay('tieu-de-ket-qua').textContent = 'KẾT QUẢ LỌC (' + ketQua.length + ')';
  lay('mo-ta-ket-qua').textContent = tuKhoaDanhMuc ? 'Từ khóa: ' + tuKhoaDanhMuc : 'Nội dung chi tiết có trong thư viện bài tập.';
  if (ketQua.length) {
    hienDanhSach('ket-qua', ketQua);
  } else {
    lay('ket-qua').innerHTML = vungTrong('Không tìm thấy anime', 'Thử từ khóa khác hoặc bớt điều kiện lọc.');
  }
}

// # Bấm Lọc Anime thì ngăn tải lại trang, chạy lọc và cuộn đến kết quả.
lay('bo-loc').onsubmit = function (suKien) {
  suKien.preventDefault(); hienKetQua();
  lay('vung-ket-qua').scrollIntoView({ behavior: 'smooth' });
};
// # Đổi kiểu sắp xếp thì hiển thị lại kết quả ngay.
lay('sap-xep').onchange = hienKetQua;
// # Trả form về mặc định, xóa từ khóa và điều kiện nhóm mới.
lay('xoa-bo-loc').onclick = function () {
  lay('bo-loc').reset(); tuKhoaDanhMuc = ''; nhomMoi = false; hienKetQua();
};
if (location.search) { hienKetQua(); }
