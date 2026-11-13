// # BẢN HỌC MÃ KANSOU: dòng bắt đầu bằng // # là lời giải thích, không chạy như lệnh.
// # Đọc từng hàm: lấy dữ liệu -> xử lý -> cập nhật giao diện hoặc lưu vào trình duyệt.
// # Mảng danhSachAnime gồm các đối tượng anime. Đây là JavaScript chứa dữ liệu, không phải tệp JSON thuần.
// # id = mã duy nhất; title = tên; nativeTitle = tên khác; author = tác giả; year = năm anime.
// # studio/country/type/season = hãng, nước, loại TV/Movie, mùa; genres = mảng thể loại.
// # poster/detailPoster/hero = đường dẫn ảnh; episodes/chapters/volumes = tập anime/chương/tập truyện.
// # synopsis/story = tóm tắt/cốt truyện; analysis = phân tích; characters = mảng nhân vật.
// # Nhân vật: name = tên; role = vai trò; traits = đặc điểm. themes = thẻ chủ đề.
// # relationships/versions/originalStatus = quan hệ, phiên bản và tình trạng nguyên tác.
// # sources = danh sách nguồn {label, url}; readUrl = nguồn đọc tham khảo.
// # sampleRating = điểm mẫu Figma; sampleReviews = cảm nhận minh họa, không phải bài viết người dùng.
// # Chỉ sửa giá trị cần đổi, giữ đúng dấu phẩy và dấu ngoặc; đường dẫn ảnh tính từ tệp HTML.

// DỮ LIỆU ANIME
// Sửa nội dung trong dấu ngoặc kép. Giữ nguyên dấu phẩy và dấu ngoặc.
var danhSachAnime = [
  {
    // # BẮT ĐẦU HỒ SƠ ANIME: mob-psycho-100
    "id": "mob-psycho-100",
    "title": "Mob Psycho 100",
    "nativeTitle": "Mob Psycho 100",
    "author": "ONE",
    "year": 2016,
    "studio": "BONES",
    "type": "TV",
    "season": "Hè",
    "country": "Nhật Bản",
    "genres": [
      "Hành động",
      "Siêu nhiên",
      "Hài hước",
      "Shonen"
    ],
    "poster": "images/572c7.png",
    "detailPoster": "images/572c7.png",
    "episodes": "12 tập mùa 1; các mùa sau tính riêng",
    "chapters": "101 chương chính, một số chương được chia thành nhiều phần",
    "volumes": "16 tập manga chính",
    "originalStatus": "Manga chính đã hoàn thành",
    "synopsis": "Mob có năng lực ngoại cảm phi thường nhưng chỉ mong sống bình thường. Cùng người thầy tự xưng Reigen, cậu xử lý các hiện tượng siêu nhiên và học cách đối diện cảm xúc của chính mình.",
    "analysis": "Những trận đấu ngoại cảm được dùng để kể về sự tự ti và quá trình trưởng thành. Mob không xem sức mạnh là thước đo duy nhất của bản thân. Cách vẽ đơn giản, biểu cảm và chuyển động biến hóa tạo nét riêng; các đoạn hài xen giữa những thời điểm cảm xúc dồn nén.",
    "characters": [
      {
        "name": "Shigeo Kageyama",
        "role": "Nam / nhân vật chính",
        "traits": "Biệt danh Mob; ít nói, có năng lực ngoại cảm mạnh"
      },
      {
        "name": "Arataka Reigen",
        "role": "Nam / người hướng dẫn",
        "traits": "Điều hành văn phòng tư vấn tâm linh; giỏi giao tiếp"
      },
      {
        "name": "Ritsu Kageyama",
        "role": "Nam / em trai Mob",
        "traits": "Học giỏi, có nhiều áp lực khi so sánh với anh"
      },
      {
        "name": "Teruki Hanazawa",
        "role": "Nam / người có siêu năng lực",
        "traits": "Từng đề cao sức mạnh; thay đổi sau khi gặp Mob"
      }
    ],
    "themes": [
      "Trưởng thành",
      "Cảm xúc",
      "Ngoại cảm",
      "Tình anh em",
      "Tự tin"
    ],
    "relationships": "Mob và Reigen là học trò và người hướng dẫn. Mob và Ritsu là anh em. Tsubomi là người Mob thầm thích; không mặc định họ là một cặp đôi.",
    "versions": "Manga gốc; ba mùa anime truyền hình; tập đặc biệt và OVA; loạt phim người đóng.",
    "readUrl": "https://digital.darkhorse.com/series/1005/mob-psycho-100",
    "sources": [
      {
        "label": "Anime chính thức",
        "url": "https://mobpsycho100.com/"
      },
      {
        "label": "Tác giả và xuất bản",
        "url": "https://digital.darkhorse.com/series/1005/mob-psycho-100"
      },
      {
        "label": "Tập 16 và trạng thái hoàn thành",
        "url": "https://e-comi.shogakukan.co.jp/books/091284600000d0000000"
      }
    ],
    "sampleReviews": [
      "Mình thích Mob vì cậu ấy có sức mạnh lớn nhưng vẫn cố gắng từ những việc nhỏ như tập thể dục và kết bạn. Reigen gây cười mà nhiều lúc nói rất đúng. Những đoạn chiến đấu lạ mắt khiến mình muốn xem lại."
    ],
    "sampleRating": 3.9,
    "sampleRatingCount": 0,
    "checkedAt": "2026-10-28",
    "dataSource": "Figma; đối chiếu website chính thức",
    "originYear": "2012 (manga); 2016 (anime)"
  },
  {
    // # BẮT ĐẦU HỒ SƠ ANIME: sakamoto-days
    "id": "sakamoto-days",
    "title": "Sakamoto Days",
    "nativeTitle": "サカモトデイズ • Sakamoto Deizu • Sát thủ về vườn",
    "author": "Yuto Suzuki",
    "year": 2025,
    "originYear": "2020 (manga); 2025 (anime)",
    "country": "Nhật Bản",
    "studio": "TMS Entertainment",
    "season": "Đông",
    "type": "TV",
    "genres": [
      "Hành động",
      "Hài hước",
      "Shonen",
      "Slice of Life",
      "Tội phạm",
      "Đời thường",
      "Chính kịch"
    ],
    "poster": "images/14cda.png",
    "detailPoster": "images/1f3bf.png",
    "episodes": "Mùa 1 năm 2025 gồm 22 tập, chia hai đợt 11 tập",
    "chapters": "Đang cập nhật theo bản manga tại nguồn chính thức",
    "volumes": "Manga đang ra tập; kiểm tra danh mục xuất bản khi nhập",
    "originalStatus": "Manga đang phát hành",
    "synopsis": "Taro Sakamoto từng là sát thủ khiến cả giới ngầm e dè, rồi giải nghệ để lập gia đình và mở cửa hàng. Khi quá khứ đuổi tới, anh phải bảo vệ vợ con mà vẫn giữ lời hứa không giết người. Shin, một sát thủ trẻ đọc được suy nghĩ, bị cuốn vào cuộc sống vừa bán hàng vừa né truy sát ấy.",
    "analysis": "Tình huống sinh hoạt thường trở thành địa điểm giao chiến, tạo nhiều cơ hội cho sự hài hước và cách dùng đồ vật bất ngờ. Mối quan hệ gia đình giữ cho mục tiêu của Sakamoto rõ ràng. Người chờ những trận đấu dồn dập có thể thấy các đoạn giới thiệu nhân vật đi chậm hơn mong đợi.",
    "sampleReviews": [
      "Ông chú bán hàng này nhìn hiền mà ra tay thì hết hiền. Mình thích mấy pha lấy ngay đồ xung quanh để đánh, rất có duyên. Một số cảnh anime chưa làm mình thấy đã như tưởng tượng lúc đọc truyện, nhưng dàn nhân vật vẫn cuốn."
    ],
    "characters": [
      {
        "name": "Taro Sakamoto",
        "role": "Nam / nhân vật chính",
        "traits": "sát thủ giải nghệ, thương gia đình"
      },
      {
        "name": "Shin Asakura",
        "role": "Nam / đồng đội",
        "traits": "đọc suy nghĩ, làm ở cửa hàng"
      },
      {
        "name": "Lu Xiaotang",
        "role": "Nữ / đồng đội",
        "traits": "giỏi võ, làm ở cửa hàng"
      },
      {
        "name": "Aoi Sakamoto",
        "role": "Nữ / vợ Sakamoto",
        "traits": "thẳng thắn, coi trọng mạng người"
      },
      {
        "name": "Nagumo Yoichi",
        "role": "Nam / sát thủ ORDER",
        "traits": "bạn cũ của Sakamoto"
      },
      {
        "name": "Heisuke Mashimo",
        "role": "Nam / xạ thủ",
        "traits": "đồng hành cùng chim Piisuke"
      },
      {
        "name": "Kei Uzuki / Slur",
        "role": "Nam / nhân vật đối địch",
        "traits": "gắn với thế giới sát thủ"
      }
    ],
    "relationships": "Taro × Aoi: vợ chồng, có con gái Hana. Taro và Shin: đồng đội, người đi trước và người học hỏi.",
    "themes": [
      "sát thủ giải nghệ",
      "gia đình",
      "cửa hàng tiện lợi",
      "đọc suy nghĩ",
      "truy đuổi",
      "nguyên tắc không giết"
    ],
    "versions": "Manga gốc; anime; manga ngoại truyện Sakamoto Holidays; tiểu thuyết ngoại truyện.",
    "readUrl": "https://www.viz.com/shonenjump/chapters/sakamoto-days",
    "sources": [
      {
        "label": "Website anime chính thức",
        "url": "https://sakamotodays.jp/"
      },
      {
        "label": "Nguồn xuất bản chính thức",
        "url": "https://www.viz.com/sakamoto-days"
      },
      {
        "label": "Poster và thông tin anime (Kitsu)",
        "url": "https://kitsu.io/anime/48915"
      },
      {
        "label": "Nhân vật – website anime chính thức",
        "url": "https://sakamotodays.jp/character/"
      }
    ],
    "sampleRating": 4.9,
    "sampleRatingCount": 423,
    "checkedAt": "2026-10-28",
    "dataSource": "27_Anime_Manga_Input_Website.docx",
    "hero": "images/937e6.png"
  },
  {
    // # BẮT ĐẦU HỒ SƠ ANIME: attack-on-titan
    "id": "attack-on-titan",
    "title": "Attack On Titan",
    "nativeTitle": "Đại chiến Titan",
    "author": "Hajime Isayama",
    "year": 2013,
    "originYear": "2009 (manga); 2013 (anime)",
    "country": "Nhật Bản",
    "studio": "Wit Studio",
    "season": "Xuân",
    "type": "TV",
    "genres": [
      "Hành động chính kịch",
      "Kỳ ảo đen tối",
      "Bí ẩn",
      "Giật gân",
      "Kinh dị",
      "Quân sự",
      "Chính trị",
      "Hậu tận thế",
      "Shonen"
    ],
    "poster": "images/e19ff.png",
    "detailPoster": "images/word-attack-on-titan.jpg",
    "episodes": "25 tập mùa 1 (2013); các mùa sau và tập đặc biệt kết thúc tính riêng",
    "chapters": "139 chương chính; các trang bổ sung và ngoại truyện tính riêng",
    "volumes": "34 tập manga chính",
    "originalStatus": "Manga chính và cốt truyện anime chính đã hoàn thành",
    "synopsis": "Eren Yeager sống trong những bức tường bảo vệ con người khỏi Titan ăn thịt. Sau khi quê nhà bị tấn công, cậu cùng Mikasa và Armin gia nhập quân đội để chống lại chúng. Những phát hiện ngoài tường từng bước làm thay đổi hiểu biết của cả nhóm về kẻ thù và lịch sử nơi mình đang sống.",
    "analysis": "Phim bắt đầu bằng nỗi sợ sinh tồn rồi mở rộng sang xung đột giữa những cộng đồng có ký ức và lợi ích khác nhau. Bí mật được cài qua nhiều mùa nên việc nhớ chi tiết có ích. Bạo lực và những lựa chọn gây tranh cãi khiến trải nghiệm càng về sau càng nặng.",
    "sampleReviews": [
      "Đã nghĩ mình đoán được thế giới này vài lần, lần nào cũng phải nghĩ lại. Mình thích cách những chi tiết cũ bỗng có ý nghĩa khác. Xem rất cuốn nhưng mệt thật, nhiều quyết định của nhân vật khiến mình bực mà vẫn hiểu họ từ đâu ra."
    ],
    "characters": [
      {
        "name": "Eren Yeager",
        "role": "Nam / nhân vật trung tâm",
        "traits": "quyết liệt, khao khát tự do"
      },
      {
        "name": "Mikasa Ackerman",
        "role": "Nữ / đồng đội",
        "traits": "chiến đấu giỏi, bảo vệ người thân"
      },
      {
        "name": "Armin Arlert",
        "role": "Nam / bạn thân",
        "traits": "tư duy chiến lược, tò mò thế giới"
      },
      {
        "name": "Levi Ackerman",
        "role": "Nam / chỉ huy chiến đấu",
        "traits": "kỷ luật, giàu kinh nghiệm"
      }
    ],
    "relationships": "Eren, Mikasa và Armin: lớn lên cùng nhau, đồng đội. Tình cảm của Mikasa dành cho Eren là một tuyến quan trọng; tránh tóm tắt kết cục.",
    "themes": [
      "chiến tranh",
      "tự do",
      "thù hận",
      "tuyên truyền",
      "sinh tồn",
      "bí mật lịch sử",
      "lựa chọn đạo đức"
    ],
    "versions": "Manga chính; anime; OVA No Regrets và Lost Girls; các manga ngoại truyện; phim tổng hợp The Last Attack; phim người đóng.",
    "readUrl": "https://kodansha.us/series/attack-on-titan/",
    "sources": [
      {
        "label": "Website anime chính thức",
        "url": "https://shingeki.tv/season1/"
      },
      {
        "label": "Nguồn xuất bản chính thức",
        "url": "https://kodansha.us/series/attack-on-titan/"
      },
      {
        "label": "Poster và thông tin anime (Kitsu)",
        "url": "https://kitsu.io/anime/7442"
      }
    ],
    "sampleRating": 5,
    "sampleRatingCount": 0,
    "checkedAt": "2026-10-28",
    "dataSource": "27_Anime_Manga_Input_Website.docx"
  },
  {
    // # BẮT ĐẦU HỒ SƠ ANIME: violet-evergarden
    "id": "violet-evergarden",
    "title": "Violet Evergarden",
    "nativeTitle": "Violet Evergarden",
    "author": "Kana Akatsuki (tiểu thuyết); Akiko Takase (minh họa)",
    "year": 2018,
    "originYear": "2015 (tiểu thuyết); 2018 (anime)",
    "country": "Nhật Bản",
    "studio": "Kyoto Animation",
    "season": "Đông",
    "type": "TV",
    "genres": [
      "Chính kịch",
      "Đời thường",
      "Tình cảm",
      "Kỳ ảo",
      "Chính kịch hậu chiến",
      "Slice of Life"
    ],
    "poster": "images/8a9e6.png",
    "detailPoster": "images/word-violet-evergarden.jpg",
    "episodes": "13 tập TV (2018); 1 tập đặc biệt và các phim tính riêng",
    "chapters": "Không áp dụng số chương manga; nguyên tác là light novel",
    "volumes": "4 tập light novel, gồm hai tập chính, Gaiden và Ever After",
    "originalStatus": "Loạt tiểu thuyết đã hoàn thành; anime TV đã phát hành đủ",
    "synopsis": "Sau chiến tranh, Violet, cô gái từng được nuôi dạy như một người lính, bắt đầu công việc viết thư thuê. Cô muốn hiểu ý nghĩa câu nói yêu thương mà một người quan trọng đã để lại. Qua những lá thư gửi người thân, người yêu và người đã mất, Violet học cách gọi tên cảm xúc của người khác và của mình.",
    "analysis": "Công việc viết thư cho phép mỗi tập đi vào một hoàn cảnh khác nhau, từ tình thân đến lời chia tay. Hình ảnh và âm nhạc dành nhiều chỗ cho khoảng lặng. Phim có những đoạn bi thương khá đậm; người thích kể chuyện tiết chế có thể thấy cảm xúc bị đẩy mạnh.",
    "sampleReviews": [
      "Có tập mình phải ngồi yên một lúc mới xem tiếp được. Cảnh đẹp đến mức chỉ muốn dừng lại nhìn, nhưng thứ ở lại lâu hơn lại là mấy lá thư. Vài đoạn hơi cố làm buồn với mình, dù vậy vẫn khó cầm lòng."
    ],
    "characters": [
      {
        "name": "Violet Evergarden",
        "role": "Nữ / nhân vật chính",
        "traits": "cựu binh, viết thư thuê"
      },
      {
        "name": "Claudia Hodgins",
        "role": "Nam / chủ công ty bưu chính",
        "traits": "cựu quân nhân, nâng đỡ Violet"
      },
      {
        "name": "Gilbert Bougainvillea",
        "role": "Nam / sĩ quan",
        "traits": "người có ảnh hưởng lớn đến Violet"
      },
      {
        "name": "Cattleya Baudelaire",
        "role": "Nữ / đồng nghiệp",
        "traits": "viết thư thuê, hiểu cảm xúc"
      }
    ],
    "relationships": "Violet và Gilbert: quan hệ trung tâm gắn với quá khứ quân ngũ và tình cảm. Violet và Hodgins: sự chăm sóc, hỗ trợ khi trở lại đời sống dân sự.",
    "themes": [
      "viết thư",
      "mất mát",
      "sang chấn",
      "gia đình",
      "thấu hiểu cảm xúc",
      "tái hòa nhập"
    ],
    "versions": "Light novel gốc; anime TV; tập đặc biệt; Eternity and the Auto Memory Doll; Violet Evergarden The Movie.",
    "readUrl": "https://www.kyotoanimation.co.jp/books/violet/",
    "sources": [
      {
        "label": "Website anime chính thức",
        "url": "https://tv.violet-evergarden.jp/"
      },
      {
        "label": "Nguồn xuất bản chính thức",
        "url": "https://tv.violet-evergarden.jp/"
      },
      {
        "label": "Poster và thông tin anime (Kitsu)",
        "url": "https://kitsu.io/anime/12230"
      }
    ],
    "sampleRating": 3.9,
    "sampleRatingCount": 0,
    "checkedAt": "2026-10-28",
    "dataSource": "27_Anime_Manga_Input_Website.docx"
  },
  {
    // # BẮT ĐẦU HỒ SƠ ANIME: demon-slayer
    "id": "demon-slayer",
    "title": "Demon Slayer",
    "nativeTitle": "Thanh gươm diệt quỷ",
    "author": "Koyoharu Gotouge",
    "year": 2019,
    "originYear": "2016 (manga); 2019 (anime)",
    "country": "Nhật Bản",
    "studio": "ufotable",
    "season": "Xuân",
    "type": "TV",
    "genres": [
      "Hành động",
      "Kỳ ảo đen tối",
      "Siêu nhiên",
      "Phiêu lưu",
      "Chính kịch",
      "Kinh dị",
      "Lịch sử giả tưởng",
      "Shonen"
    ],
    "poster": "images/89d01.png",
    "detailPoster": "images/word-demon-slayer.jpg",
    "episodes": "26 tập mùa 1 (2019); các arc sau và bản điện ảnh tính riêng",
    "chapters": "205 chương chính; ngoại truyện và phần bổ sung tính riêng",
    "volumes": "23 tập manga chính",
    "originalStatus": "Manga chính đã hoàn thành",
    "synopsis": "Tanjiro Kamado trở về nhà và thấy gia đình bị quỷ sát hại, chỉ em gái Nezuko còn sống nhưng đã hóa quỷ. Cậu học kiếm thuật, gia nhập Sát Quỷ Đoàn và lên đường tìm cách giúp em trở lại làm người. Trên hành trình ấy, Tanjiro gặp những người đồng đội cùng mang mất mát và lý do chiến đấu riêng.",
    "analysis": "Mục tiêu cứu em gái khiến câu chuyện dễ theo dõi ngay từ đầu. Các trận kiếm kết hợp hiệu ứng thị giác mạnh với hồi tưởng về đối thủ. Cách chuyển từ bi kịch sang hài ồn ào khá đột ngột, có thể làm người xem thích không khí nghiêm túc bị ngắt cảm xúc.",
    "sampleReviews": [
      "Mình xem vì những trận kiếm rồi ở lại vì tình anh em. Mỗi lần Tanjiro nghĩ đến Nezuko là thấy mềm lòng. Riêng Zenitsu la hét nhiều quá, có đoạn mình phải giảm âm lượng dù biết đó là kiểu hài của phim."
    ],
    "characters": [
      {
        "name": "Tanjiro Kamado",
        "role": "Nam / nhân vật chính",
        "traits": "tốt bụng, kiếm sĩ, thương em"
      },
      {
        "name": "Nezuko Kamado",
        "role": "Nữ / em gái Tanjiro",
        "traits": "hóa quỷ, bảo vệ gia đình"
      },
      {
        "name": "Zenitsu Agatsuma",
        "role": "Nam / đồng đội",
        "traits": "nhút nhát, dùng Hơi thở Sấm Sét"
      },
      {
        "name": "Inosuke Hashibira",
        "role": "Nam / đồng đội",
        "traits": "hiếu chiến, đội đầu heo"
      }
    ],
    "relationships": "Tanjiro và Nezuko: anh em ruột. Nhóm Tanjiro, Zenitsu và Inosuke: đồng đội. Các kết đôi cuối truyện có thể gây lộ nội dung nên không đưa vào mô tả mở đầu.",
    "themes": [
      "kiếm thuật",
      "săn quỷ",
      "anh em",
      "gia đình",
      "lòng trắc ẩn",
      "thời Taisho",
      "huấn luyện"
    ],
    "versions": "Manga chính; manga ngoại truyện; anime theo từng arc; Mugen Train có cả bản phim và bản truyền hình; loạt phim Infinity Castle.",
    "readUrl": "https://www.viz.com/shonenjump/chapters/demon-slayer-kimetsu-no-yaiba",
    "sources": [
      {
        "label": "Website anime chính thức",
        "url": "https://kimetsu.com/anime/"
      },
      {
        "label": "Nguồn xuất bản chính thức",
        "url": "https://www.viz.com/demon-slayer-kimetsu-no-yaiba"
      },
      {
        "label": "Poster và thông tin anime (Kitsu)",
        "url": "https://kitsu.io/anime/41370"
      }
    ],
    "sampleRating": 4.1,
    "sampleRatingCount": 0,
    "checkedAt": "2026-10-28",
    "dataSource": "27_Anime_Manga_Input_Website.docx"
  },
  {
    // # BẮT ĐẦU HỒ SƠ ANIME: blue-lock
    "id": "blue-lock",
    "title": "Blue Lock",
    "nativeTitle": "Blue Lock",
    "author": "Muneyuki Kaneshiro (kịch bản); Yusuke Nomura (minh họa)",
    "year": 2022,
    "originYear": "2018 (manga); 2022 (anime)",
    "country": "Nhật Bản",
    "studio": "8bit",
    "season": "Thu",
    "type": "TV",
    "genres": [
      "Thể thao",
      "Tâm lý",
      "Giật gân",
      "Chính kịch",
      "Hành động thể thao",
      "Shonen"
    ],
    "poster": "images/3cce0.png",
    "detailPoster": "images/word-blue-lock.jpg",
    "episodes": "24 tập mùa 1 (2022); các mùa sau và phim Episode Nagi tính riêng",
    "chapters": "Đang cập nhật theo bản manga tại nguồn chính thức",
    "volumes": "Manga đang ra tập; ngoại truyện Episode Nagi tính riêng",
    "originalStatus": "Manga chính đang phát hành",
    "synopsis": "Yoichi Isagi được mời vào Blue Lock, chương trình tập hợp các tiền đạo trẻ để tìm ra người có thể đưa bóng đá Nhật lên đỉnh cao. Những bài kiểm tra liên tục buộc cậu vừa hợp tác vừa cạnh tranh với người khác. Isagi phải tìm điểm mạnh của mình và học cách đưa ra quyết định khi bàn thắng quyết định cơ hội ở lại.",
    "analysis": "Phim diễn tả tư duy thi đấu bằng hình ảnh cường điệu và độc thoại nội tâm dày. Cấu trúc tuyển chọn tạo áp lực rõ ràng, nhưng cách thể hiện bóng đá thiên về kịch tính hơn mô phỏng một trận đấu thực tế. Tình đồng đội luôn đi cùng mục tiêu cá nhân.",
    "sampleReviews": [
      "Xem mà thấy ai cũng muốn nuốt chửng ai, căng ghê. Mình thích lúc Isagi tự hiểu ra mình vừa làm sai ở đâu. Đôi khi đang có bóng mà nói trong đầu lâu quá, mình chỉ mong sút nhanh đi đã."
    ],
    "characters": [
      {
        "name": "Yoichi Isagi",
        "role": "Nam / nhân vật chính",
        "traits": "quan sát không gian, thích nghi"
      },
      {
        "name": "Meguru Bachira",
        "role": "Nam / đối thủ và đồng đội",
        "traits": "rê bóng sáng tạo, phóng khoáng"
      },
      {
        "name": "Seishiro Nagi",
        "role": "Nam / đối thủ",
        "traits": "đỡ bóng giỏi, ban đầu thiếu động lực"
      },
      {
        "name": "Jinpachi Ego",
        "role": "Nam / người điều hành",
        "traits": "đề cao cái tôi của tiền đạo"
      }
    ],
    "relationships": "Isagi và các cầu thủ: đối thủ, đồng đội tùy vòng tuyển chọn. Nagi và Reo: bạn bè, cộng sự bóng đá; không mặc định là quan hệ yêu đương.",
    "themes": [
      "bóng đá",
      "tiền đạo",
      "cạnh tranh loại trực tiếp",
      "cái tôi",
      "tham vọng",
      "chiến thuật",
      "áp lực thành tích"
    ],
    "versions": "Manga chính; ngoại truyện Episode Nagi; anime TV; phim Blue Lock Episode Nagi.",
    "readUrl": "https://kodansha.us/series/blue-lock/",
    "sources": [
      {
        "label": "Website anime chính thức",
        "url": "https://bluelock-pr.com/"
      },
      {
        "label": "Nguồn xuất bản chính thức",
        "url": "https://kodansha.us/series/blue-lock/"
      },
      {
        "label": "Poster và thông tin anime (Kitsu)",
        "url": "https://kitsu.io/anime/44973"
      }
    ],
    "sampleRating": null,
    "sampleRatingCount": 0,
    "checkedAt": "2026-10-28",
    "dataSource": "27_Anime_Manga_Input_Website.docx"
  },
  {
    // # BẮT ĐẦU HỒ SƠ ANIME: chainsaw-man
    "id": "chainsaw-man",
    "title": "Chainsaw Man",
    "nativeTitle": "Chainsaw Man / Người cưa",
    "author": "Tatsuki Fujimoto",
    "year": 2022,
    "originYear": "2018 (manga); 2022 (anime)",
    "country": "Nhật Bản",
    "studio": "MAPPA",
    "season": "Thu",
    "type": "TV",
    "genres": [
      "Hành động",
      "Kỳ ảo đen tối",
      "Kinh dị",
      "Siêu nhiên",
      "Hài đen",
      "Chính kịch",
      "Giật gân",
      "Shonen",
      "Hài hước"
    ],
    "poster": "images/fc47b.png",
    "detailPoster": "images/word-chainsaw-man.jpg",
    "episodes": "12 tập mùa TV đầu (2022); phim Reze Arc tính riêng",
    "chapters": "Phần 1 gồm 97 chương; phần 2 theo danh mục chương chính thức",
    "volumes": "Theo danh mục xuất bản chính thức, tách bản Nhật và bản dịch",
    "originalStatus": "Theo từng phần truyện tại nguồn xuất bản",
    "synopsis": "Denji sống trong nợ nần, kiếm tiền bằng việc săn quỷ cùng Pochita, chú quỷ mang hình dáng cưa máy. Sau một lần bị phản bội, cậu hợp nhất với Pochita và trở thành Chainsaw Man. Công việc mới trong lực lượng săn quỷ đưa Denji đến gần những mong muốn giản dị, cũng khiến cậu dễ bị người khác điều khiển.",
    "analysis": "Anime mùa đầu xen sinh hoạt lặng với cảnh bạo lực. Denji hành động theo nhu cầu rất cụ thể, đôi khi vụng về hoặc khó chịu. Máu me và yếu tố tình dục xuất hiện thường xuyên; giọng kể có thể chuyển nhanh từ buồn cười sang bất an.",
    "sampleReviews": [
      "Ban đầu thấy Denji hơi thô, xem thêm mới thương vì cậu ấy cần ít đến tội. Mình thích những cảnh cả nhóm ở chung nhà hơn tưởng tượng. Có đoạn ghê thật, đang cười xong tự nhiên lạnh cả người."
    ],
    "characters": [
      {
        "name": "Denji",
        "role": "Nam / nhân vật chính",
        "traits": "nghèo khó, hợp nhất với Pochita"
      },
      {
        "name": "Makima",
        "role": "Nữ / cấp trên",
        "traits": "điềm tĩnh, khó đoán"
      },
      {
        "name": "Aki Hayakawa",
        "role": "Nam / đồng đội",
        "traits": "nghiêm túc, săn quỷ"
      },
      {
        "name": "Power",
        "role": "Nữ / huyết ma nhân",
        "traits": "ồn ào, bốc đồng"
      }
    ],
    "relationships": "Denji và Makima: quan hệ cấp trên, cấp dưới cùng sự thu hút mất cân bằng. Denji, Aki và Power: sống chung, gắn bó dần. Không gắn quan hệ gia đình này thành cặp đôi.",
    "themes": [
      "quỷ",
      "nghèo đói",
      "ham muốn",
      "thao túng",
      "thân mật",
      "mất mát",
      "sinh tồn"
    ],
    "versions": "Manga hai phần; anime TV; phim Chainsaw Man The Movie Reze Arc; tiểu thuyết Buddy Stories.",
    "readUrl": "https://www.viz.com/shonenjump/chapters/chainsaw-man",
    "sources": [
      {
        "label": "Website anime chính thức",
        "url": "https://chainsawman.dog/tvseries/"
      },
      {
        "label": "Nguồn xuất bản chính thức",
        "url": "https://www.viz.com/chainsaw-man"
      },
      {
        "label": "Poster và thông tin anime (Kitsu)",
        "url": "https://kitsu.io/anime/43806"
      }
    ],
    "sampleRating": 4.3,
    "sampleRatingCount": 0,
    "checkedAt": "2026-10-28",
    "dataSource": "27_Anime_Manga_Input_Website.docx"
  },
  {
    // # BẮT ĐẦU HỒ SƠ ANIME: kimi-ni-todoke
    "id": "kimi-ni-todoke",
    "title": "From Me To You",
    "nativeTitle": "Gửi đến bạn / From Me to You",
    "author": "Karuho Shiina",
    "year": 2009,
    "originYear": "2005 (manga); 2009 (anime)",
    "country": "Nhật Bản",
    "studio": "Production I.G",
    "season": "Thu",
    "type": "TV",
    "genres": [
      "Tình cảm",
      "Hài lãng mạn",
      "Đời thường",
      "Học đường",
      "Chính kịch",
      "Shojo",
      "Trường học",
      "Slice of Life",
      "Hài hước"
    ],
    "poster": "images/c0a48.png",
    "detailPoster": "images/word-kimi-ni-todoke.jpg",
    "episodes": "25 tập mùa 1 (2009); các mùa sau tính riêng",
    "chapters": "123 chương chính; ngoại truyện tính riêng",
    "volumes": "30 tập manga gốc",
    "originalStatus": "Manga chính đã hoàn thành",
    "synopsis": "Sawako Kuronuma hiền lành nhưng thường bị bạn học xa lánh vì vẻ ngoài gợi nhớ nhân vật phim kinh dị. Khi Shota Kazehaya chủ động bắt chuyện, cô dần có bạn, học cách nói điều mình nghĩ và nhận ra tình cảm dành cho cậu. Những hiểu lầm ở trường khiến cả hai phải tập thành thật với nhau.",
    "analysis": "Nhịp phim chậm, dành nhiều thời gian cho những lần ngập ngừng và suy nghĩ của Sawako. Tình bạn với Chizuru và Ayane có sức nặng riêng, giúp câu chuyện bớt phụ thuộc vào chuyện yêu đương. Người ít kiên nhẫn với hiểu lầm kéo dài có thể thấy sốt ruột.",
    "sampleReviews": [
      "Sawako dễ thương quá, nhất là lúc bắt đầu có bạn để ăn trưa cùng. Có đoạn mình muốn chui vào màn hình nói hộ hai đứa cho xong, nhưng vẫn thích cái cách tình cảm tiến từng chút một."
    ],
    "characters": [
      {
        "name": "Sawako Kuronuma",
        "role": "Nữ / nhân vật chính",
        "traits": "hiền lành, rụt rè, muốn kết bạn"
      },
      {
        "name": "Shota Kazehaya",
        "role": "Nam / nam chính",
        "traits": "cởi mở, được bạn bè quý mến"
      },
      {
        "name": "Ayane Yano",
        "role": "Nữ / bạn thân",
        "traits": "tinh ý, thẳng thắn"
      },
      {
        "name": "Chizuru Yoshida",
        "role": "Nữ / bạn thân",
        "traits": "bộc trực, trọng tình bạn"
      }
    ],
    "relationships": "Sawako × Kazehaya: tuyến tình cảm chính. Sawako, Ayane và Chizuru: bạn thân.",
    "themes": [
      "tình đầu",
      "tình bạn",
      "trưởng thành",
      "hiểu lầm",
      "giao tiếp",
      "vượt qua mặc cảm"
    ],
    "versions": "Manga gốc; anime nhiều mùa; phim và loạt phim người đóng; ngoại truyện Kimi ni Todoke From Me to You Soulmate.",
    "readUrl": "https://www.viz.com/kimi-ni-todoke-from-me-to-you",
    "sources": [
      {
        "label": "Website anime chính thức",
        "url": "https://kimitodo.com/"
      },
      {
        "label": "Nguồn xuất bản chính thức",
        "url": "https://www.viz.com/kimi-ni-todoke-from-me-to-you"
      },
      {
        "label": "Poster và thông tin anime (Kitsu)",
        "url": "https://kitsu.io/anime/4397"
      }
    ],
    "sampleRating": 4.6,
    "sampleRatingCount": 0,
    "checkedAt": "2026-10-28",
    "dataSource": "27_Anime_Manga_Input_Website.docx"
  },
  {
    // # BẮT ĐẦU HỒ SƠ ANIME: my-hero-academia
    "id": "my-hero-academia",
    "title": "My Hero Academia",
    "nativeTitle": "Học viện siêu anh hùng",
    "author": "Kohei Horikoshi",
    "year": 2016,
    "studio": "BONES",
    "type": "TV",
    "season": "Xuân",
    "country": "Nhật Bản",
    "genres": [
      "Hành động",
      "Shonen",
      "Trường học",
      "Siêu nhiên"
    ],
    "poster": "images/6b454.png",
    "detailPoster": "images/6b454.png",
    "episodes": "13 tập mùa 1; các mùa sau tính riêng",
    "chapters": "430 chương chính; chương 431 More bổ sung trong tập cuối",
    "volumes": "42 tập manga chính",
    "originalStatus": "Manga chính đã hoàn thành",
    "synopsis": "Sinh ra không có siêu năng lực, Izuku vẫn mơ trở thành anh hùng. Cuộc gặp với All Might mở ra cơ hội vào học viện U.A., nơi cậu phải rèn luyện và tìm ý nghĩa của việc cứu người.",
    "analysis": "Phim kết hợp việc học ở U.A. với những bài kiểm tra thực tế về trách nhiệm cứu người. Izuku phải rèn luyện để dùng được sức mạnh được truyền lại. Dàn nhân vật đông tạo nhiều phong cách chiến đấu; các cuộc đối đầu có thể kéo dài qua nhiều tập.",
    "characters": [
      {
        "name": "Izuku Midoriya",
        "role": "Nam / nhân vật chính",
        "traits": "Biệt danh Deku; nhận One For All, luôn muốn cứu người"
      },
      {
        "name": "Katsuki Bakugo",
        "role": "Nam / bạn học và đối thủ",
        "traits": "Hiếu thắng; năng lực tạo vụ nổ"
      },
      {
        "name": "All Might",
        "role": "Nam / người thầy",
        "traits": "Biểu tượng hòa bình, truyền sức mạnh cho Izuku"
      },
      {
        "name": "Ochaco Uraraka",
        "role": "Nữ / bạn học",
        "traits": "Năng lực không trọng lực; quan tâm người khác"
      }
    ],
    "themes": [
      "Siêu anh hùng",
      "Trường học",
      "Truyền thừa",
      "Nỗ lực",
      "Cứu người"
    ],
    "relationships": "Izuku và All Might là học trò và người truyền dạy. Izuku và Bakugo có quan hệ bạn thuở nhỏ, cạnh tranh và cùng trưởng thành. Ochaco là bạn học thân thiết của Izuku.",
    "versions": "Manga chính; nhiều mùa anime truyền hình; các phim điện ảnh; ngoại truyện Vigilantes.",
    "readUrl": "https://www.viz.com/my-hero-academia",
    "sources": [
      {
        "label": "Anime chính thức",
        "url": "https://heroaca.com/"
      },
      {
        "label": "Giới thiệu nguyên tác",
        "url": "https://www.viz.com/my-hero-academia"
      },
      {
        "label": "Tập cuối và chương 431",
        "url": "https://www.shueisha.co.jp/books/items/contents.html?jdcn=08X10000000055591900"
      }
    ],
    "sampleReviews": [
      "Mình thích cách Izuku luôn nghĩ đến việc cứu người trước khi thắng. Các bạn trong lớp có năng lực khác nhau nên xem phối hợp khá vui. Có những đoạn giải thích hơi dài, nhưng các trận quan trọng vẫn làm mình hồi hộp."
    ],
    "sampleRating": 3.6,
    "sampleRatingCount": 0,
    "checkedAt": "2026-10-28",
    "dataSource": "Figma; đối chiếu website chính thức",
    "originYear": "2014 (manga); 2016 (anime)"
  },
  {
    // # BẮT ĐẦU HỒ SƠ ANIME: hunter-x-hunter
    "id": "hunter-x-hunter",
    "title": "Hunter x Hunter",
    "nativeTitle": "Thợ săn tí hon",
    "author": "Yoshihiro Togashi",
    "year": 2011,
    "studio": "Madhouse",
    "type": "TV",
    "season": "Thu",
    "country": "Nhật Bản",
    "genres": [
      "Phiêu lưu",
      "Hành động",
      "Shonen",
      "Tâm lý"
    ],
    "poster": "images/55764.png",
    "detailPoster": "images/55764.png",
    "episodes": "148 tập bản TV 2011",
    "chapters": "Manga còn phát hành, không chốt tổng số chương",
    "volumes": "Danh mục VIZ có đến tập 38; bản Nhật và lịch xuất bản từng ngôn ngữ khác nhau",
    "originalStatus": "Manga chưa hoàn thành; bản anime truyền hình 2011 đã kết thúc ở tập 148",
    "synopsis": "Gon rời quê nhà để trở thành Hunter và tìm người cha mất tích. Kỳ thi khắc nghiệt đưa cậu đến với Killua, Kurapika và Leorio; tình bạn của họ liên tục bị thử thách bởi một thế giới khó đoán.",
    "analysis": "Hệ thống Niệm đặt ra quy tắc và đánh đổi, khiến chiến thuật quan trọng hơn sức mạnh đơn thuần. Các chặng phiêu lưu có giọng điệu khác nhau, từ kỳ thi đến những xung đột nặng nề. Một số đoạn dành nhiều thời gian giải thích chiến thuật và nội tâm.",
    "characters": [
      {
        "name": "Gon Freecss",
        "role": "Nam / nhân vật chính",
        "traits": "Cương trực, quyết tâm trở thành Hunter để tìm cha"
      },
      {
        "name": "Killua Zoldyck",
        "role": "Nam / bạn thân của Gon",
        "traits": "Xuất thân gia đình sát thủ, nhanh nhạy và trung thành"
      },
      {
        "name": "Kurapika",
        "role": "Nam / đồng đội",
        "traits": "Người sống sót của tộc Kurta, theo đuổi mục tiêu riêng"
      },
      {
        "name": "Leorio Paradinight",
        "role": "Nam / đồng đội",
        "traits": "Muốn trở thành bác sĩ, coi trọng bạn bè"
      }
    ],
    "themes": [
      "Phiêu lưu",
      "Tình bạn",
      "Tìm cha",
      "Niệm",
      "Chiến thuật",
      "Đánh đổi"
    ],
    "relationships": "Gon và Killua là bạn thân và đồng đội. Kurapika và Leorio là những người bạn gặp trong kỳ thi Hunter. Gon tìm kiếm cha mình là Ging Freecss.",
    "versions": "Manga gốc; anime truyền hình 1999 và OVA; anime truyền hình 2011 gồm 148 tập; các phim Phantom Rouge và The Last Mission.",
    "readUrl": "https://www.viz.com/hunter-x-hunter",
    "sources": [
      {
        "label": "Anime và tập cuối 148",
        "url": "https://www.ntv.co.jp/hunterhunter/story/index.html"
      },
      {
        "label": "Tác giả và danh mục manga",
        "url": "https://www.viz.com/hunter-x-hunter"
      }
    ],
    "sampleReviews": [
      "Ban đầu mình nghĩ đây là chuyến phiêu lưu nhẹ nhàng, càng xem càng thấy nhiều lựa chọn khó. Gon và Killua phối hợp rất cuốn. Có đoạn thuyết minh khá nhiều nhưng nhờ vậy mình hiểu trận đấu hơn."
    ],
    "sampleRating": 4.2,
    "sampleRatingCount": 0,
    "checkedAt": "2026-10-28",
    "dataSource": "Figma; đối chiếu website chính thức",
    "originYear": "1998 (manga); 2011 (bản anime được chọn)"
  },
  {
    // # BẮT ĐẦU HỒ SƠ ANIME: jujutsu-kaisen-hidden-inventory
    "id": "jujutsu-kaisen-hidden-inventory",
    "title": "Chú thuật hồi chiến: Hoài Ngọc/ Ngọc Chiết",
    "nativeTitle": "Jujutsu Kaisen: Hidden Inventory / Premature Death",
    "author": "Gege Akutami",
    "year": 2025,
    "studio": "MAPPA",
    "type": "Movie",
    "season": "Xuân",
    "country": "Nhật Bản",
    "genres": [
      "Shonen",
      "Hành động",
      "Siêu nhiên"
    ],
    "poster": "images/1537e.png",
    "detailPoster": "images/1537e.png",
    "episodes": "1 phim tổng hợp; chuyển thể arc quá khứ của Gojo",
    "chapters": "Xem nguồn nguyên tác chính thức",
    "volumes": "Xem nguồn nguyên tác chính thức",
    "originalStatus": "Bản điện ảnh đã phát hành",
    "synopsis": "Từng là bạn bè, Gojo và Geto phải bảo vệ Riko Amanai – người được đánh dấu là vật hy sinh của Vật chứa Tinh thể Sao (Star Plasma Vessel). Bị săn lùng bởi các nhóm cuồng tín và chú thuật sư ác ý, hai chú thuật sư mạnh mẽ này phải đối mặt với một nhiệm vụ thử thách giới hạn và định hình tương lai của họ.",
    "analysis": "",
    "characters": [
      {
        "name": "Satoru Gojo",
        "role": "Nhân vật",
        "traits": ""
      },
      {
        "name": "Suguru Geto",
        "role": "Nhân vật",
        "traits": ""
      },
      {
        "name": "Riko Amanai",
        "role": "Nhân vật",
        "traits": ""
      },
      {
        "name": "Toji Fushiguro",
        "role": "Nhân vật",
        "traits": ""
      }
    ],
    "themes": [],
    "relationships": "",
    "versions": "Bản điện ảnh; không cộng vào số tập TV.",
    "readUrl": "https://jujutsukaisen.jp/",
    "sources": [
      {
        "label": "Thông tin chính thức / nhà phát hành",
        "url": "https://jujutsukaisen.jp/"
      }
    ],
    "sampleReviews": [],
    "sampleRating": 4.8,
    "sampleRatingCount": 281,
    "checkedAt": "2026-10-28",
    "dataSource": "Figma; đối chiếu website chính thức"
  }
];
