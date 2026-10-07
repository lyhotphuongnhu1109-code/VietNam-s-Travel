import React, { useState, useMemo } from 'react';
import {
  Users,
  Landmark,
  Sparkles,
  BookOpen,
  Volume2,
  Calendar,
  Home,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Search,
  Filter,
  CheckCircle2,
  Maximize2,
  X,
  LayoutGrid,
  Columns2,
  Eye,
  Info,
  Camera,
  Shirt,
  Music,
  Flame,
  Palette,
  Compass,
} from 'lucide-react';
import {
  ALL_54_ETHNIC_GROUPS,
  LINGUISTIC_FAMILIES,
  REGIONS_FILTER,
  EthnicGroupDetail,
  ETHNIC_ARCHITECTURE_IMAGES,
  ETHNIC_FESTIVAL_IMAGES,
  nhaBaGianKinhImg,
  nhaSanTayBacImg,
  nhaTrinhTuongImg,
  nhaDaiEDeImg,
  thapChamArchImg,
  tayNguyenRongGongImg,
  leHoiGioToKinhImg,
  leHoiHoaBanXoeImg,
  leHoiLongTongImg,
  leCapSacDaoImg,
  leHoiCongChiengImg,
  leHoiDuaGheImg,
  chamCultureDanceImg,
  hmongBatikCostumeImg,
  thaiKhanPieuImg,
  daoHeaddressImg,
  tayDanTinhThenImg,
} from '../data/ethnicData';
import { HISTORIC_MONUMENTS } from '../data/travelData';
import { HistoricMonument, Language } from '../types';
import { playVoiceGuide } from '../utils/speech';
import { KO_ETHNIC_SIGNATURES, KO_MONUMENTS, KO_54_ETHNIC_GROUPS } from '../data/koreanTranslations';

interface CultureAndHeritageProps {
  currentLang: Language;
}

// 1. Đặc trưng trang phục độc bản 54 Dân tộc Việt Nam
const ETHNIC_COSTUME_SIGNATURES: Record<string, { vi: string; en: string }> = {
  kinh: { vi: 'Áo dài lụa ngũ thân / Áo bà ba & Nón lá sen', en: 'Silk Ao Dai / Ba Ba shirt & Conical palm hat' },
  muong: { vi: 'Khăn trắng thắt gáy & Cạp váy dệt hoa văn rồng cổ', en: 'White folded headband & Handwoven geometric dragon skirt band' },
  tho: { vi: 'Áo năm thân xẻ tà, váy sọc ngang & khăn vuông trắng', en: 'Five-panel tunic, striped skirt & white square scarf' },
  chut: { vi: 'Vải vỏ cây sui cổ xưa & thổ cẩm chàm mộc mạc', en: 'Ancient tree-bark cloth & rustic indigo cotton attire' },
  tay: { vi: 'Áo chàm dài năm thân thắt lưng lụa & kiềng bạc tròn', en: 'Long indigo five-panel gown, silk sash & round silver torque' },
  thai: { vi: 'Khăn Piêu thêu hoa ban & Áo Cóm cài cúc bướm bạc', en: 'Pieu headscarf with Ban flower embroidery & Com blouse with silver butterfly buttons' },
  nung: { vi: 'Áo chàm đậm cài khuy nách phải & khăn vuông chàm', en: 'Deep indigo tunic with right-side buttons & indigo square headwrap' },
  'san-chay': { vi: 'Áo dài chàm xẻ tà, thắt lưng đỏ xanh thêu công phu', en: 'Indigo slit gown with dual red-green embroidered sash' },
  giay: { vi: 'Áo ngắn xẻ nách viền dải vải màu sặc sỡ bản Tả Van', en: 'Side-fastening jacket trimmed with vibrant contrast ribbon bands' },
  lao: { vi: 'Váy dệt thổ cẩm hình rồng voi & búi tóc lệch cài trâm bạc', en: 'Brocade skirt with dragon-elephant motifs & side hair bun with silver hairpin' },
  lu: { vi: 'Áo thêu quả trám, răng nhuộm đen hạt huyền cài hạt kim loại', en: 'Diamond-stitched blouse & black lacquered teeth with gleaming inlays' },
  'bo-y': { vi: 'Áo ngắn xẻ ngực viền ren hoa & tạp dề thêu tinh xảo', en: 'Chest-slit short jacket with floral lace trim & ornate apron' },
  hmong: { vi: 'Váy xòe lanh vẽ sáp ong xếp ly & kiềng bạc nhiều tầng', en: 'Pleated batik hemp flared skirt & multi-tiered silver torques' },
  dao: { vi: 'Khăn đỏ rực lớn đính chùm bông len đỏ & chuông bạc leng keng', en: 'Massive scarlet headdress with lush wool tassels & silver bells' },
  'pa-then': { vi: 'Trang phục đỏ rực như ngọn lửa & khăn xếp nhiều tầng', en: 'Flame-red ceremonial costume & tall multi-tiered scarlet headdress' },
  'gia-rai': { vi: 'Thổ cẩm chàm sẫm viền chỉ đỏ, khố hoa văn & cồng chiêng', en: 'Dark indigo brocade with red borders, patterned loincloth & gongs' },
  'e-de': { vi: 'Áo chui đầu chàm dệt dải đỏ vàng ngực áo & váy krao mẫu hệ', en: 'Pullover indigo blouse with red-yellow breast band & matriarchal krao skirt' },
  cham: { vi: 'Khăn Matra trắng buông tà tha thướt & Áo dài Chăm (Aw Cam)', en: 'Flowing white Matra veil & traditional modest long Cham gown' },
  'ra-glai': { vi: 'Áo thổ cẩm ngắn, chuỗi cườm ngũ sắc & đàn Chapi ống tre', en: 'Short brocade tunic, multi-color bead strands & bamboo Chapi lute' },
  'chu-ru': { vi: 'Xà rông sọc màu, trang sức bạc & gốm Krang Gọ cổ truyền', en: 'Striped sarong, handcrafted silver rings & Krang Go pottery' },
  khmer: { vi: 'Xà rông (Sampot) lụa dệt kim tuyến óng ánh & khăn Sbay chéo vai', en: 'Metallic gold-woven silk Sampot & graceful diagonal Sbay shawl' },
  'ba-na': { vi: 'Thổ cẩm đen sọc đỏ trắng, đàn T’rưng & nhà Rông cao vút', en: 'Black brocade with red-white stripes, T’rung lute & soaring Rong house' },
  'xo-dang': { vi: 'Thổ cẩm núi Ngọc Linh, cồng chiêng & đàn ống nứa Klông-pút', en: 'Ngoc Linh mountain brocade, sacred gongs & Klong-put bamboo pipes' },
  'co-ho': { vi: 'Trang phục thổ cẩm Langbiang dệt hoa văn hình học cổ', en: 'Langbiang highland brocade woven with ancient geometric patterns' },
  hre: { vi: 'Thổ cẩm Làng Teng Ba Tơ hoa văn hình thoi đen trắng đỏ', en: 'Lang Teng Ba To brocade with bold black-white-red diamond motifs' },
  'm-nong': { vi: 'Thổ cẩm sẫm viền hạt cườm, khố hoa văn & bản sắc voi Buôn Đôn', en: 'Dark brocade with beaded edges & Buon Don elephant heritage' },
  'x-tieng': { vi: 'Khố dệt chỉ đỏ, vòng đồng cổ tay & dàn chiêng 5 chiếc', en: 'Red-threaded loincloth, brass armlets & 5-piece sacred gong set' },
  'kho-mu': { vi: 'Áo cóm khuy bạc tròn & điệu múa tra lúa Tăng bu dập dồn', en: 'Com blouse with round silver coin buttons & Tang bu rice-stamping dance' },
  'bru-van-kieu': { vi: 'Váy chàm ngắn viền đỏ, chuỗi cườm đá & khèn bè Trường Sơn', en: 'Short indigo skirt with crimson trim, stone beads & Truong Son panpipe' },
  'co-tu': { vi: 'Vải dệt Zèng đính cườm chì tinh xảo & điệu múa Tung tung Da dá', en: 'Lead-beaded Zeng textile & celebratory Tung tung Da da dance' },
  'gie-trieng': { vi: 'Váy ống sợi bông dệt chỉ đỏ, quấn ngang nách & củi le hứa hôn', en: 'Cotton tube skirt with red stripes wrapped under armpits & marriage firewood' },
  'ta-oi': { vi: 'Nghệ thuật dệt Dèng đính cườm chì A Lưới di sản quốc gia', en: 'National intangible heritage Zeng weaving with lead bead inlays' },
  ma: { vi: 'Váy dài dệt hoa văn hình thú chim rừng & chuỗi hạt cườm', en: 'Long skirt woven with forest animals & layered colorful beads' },
  co: { vi: 'Váy chàm viền vàng đỏ, chuỗi bạc & hương quế Trà Bồng thơm nức', en: 'Indigo skirt with yellow-red trims & aromatic Tra Bong cinnamon' },
  'cho-ro': { vi: 'Áo cộc bông thô viền chỉ màu & bộ đàn ống nứa Goongkla', en: 'Raw cotton crop blouse with fringe trim & Goongkla bamboo tubes' },
  'xinh-mun': { vi: 'Váy đen áo cóm cổ viền thêu chỉ đỏ bên triền sông Mã', en: 'Black skirt & blouse with red embroidered collar along Ma river' },
  khang: { vi: 'Áo chàm ngắn, búi tóc Tằng cẩu & thuyền độc mộc lướt sóng sông Đà', en: 'Short indigo tunic, top Tang cau hair bun & Da river pirogue canoe' },
  mang: { vi: 'Áo xẻ ngực đính chỉ ngũ sắc & nghề đan gùi mây Mường Tè', en: 'Front-slit jacket with 5-color stitching & Muong Te rattan backbasket' },
  'ro-mam': { vi: 'Vải bông tự nhiên trắng ngà viền đỏ sẫm làng Le Sa Thầy', en: 'Natural off-white raw cotton cloth with crimson edge in Le village' },
  brau: { vi: 'Vải chàm đen đơn giản, căng tai ngà voi & cồng chiêng Tha huyền bí', en: 'Minimal indigo cloth, ivory ear spools & sacred Tha gong pair' },
  'o-du': { vi: 'Trang phục bản Văng Môn thắt lưng rực rỡ & đón tiếng sấm đầu năm', en: 'Vang Mon folk attire with vivid sash & new year thunder festival' },
  'ha-nhi': { vi: 'Mũ búi sợi len màu rực rỡ & áo chàm thêu hoa văn quả trám', en: 'Colorful yarn wool headdress & indigo jacket with diamond embroidery' },
  'phu-la': { vi: 'Áo chui đầu đính cườm trắng hình chữ thập và hoa văn mặt trời', en: 'Slip-on tunic with white bead cross and sun burst motifs' },
  'la-hu': { vi: 'Áo dài quá gối xẻ tà nẹp vải màu tươi tắn người lá vàng', en: 'Below-knee slit tunic with contrast cloth appliques on borders' },
  'lo-lo': { vi: 'Nghệ thuật ghép vải patchwork đa sắc màu rực rỡ bậc nhất', en: 'Exquisite multi-color patchwork geometric appliqué artwork' },
  cong: { vi: 'Áo cóm xẻ ngực viền chỉ đỏ mừng lễ hội hoa mào gà đỏ thắm', en: 'Red-hemmed com blouse celebrating crimson cockscomb flower festival' },
  'si-la': { vi: 'Ngực áo đính hàng trăm đồng xu bạc óng ánh bản Can Hồ', en: 'Chest adorned with hundreds of glistening silver coins in Can Ho' },
  'la-chi': { vi: 'Áo chàm năm thân dài quá gối, thổ cẩm ruộng bậc thang', en: 'Knee-length 5-panel indigo coat amidst Hoang Su Phi rice terraces' },
  'la-ha': { vi: 'Áo cóm khuy bạc, múa kiếm gỗ & chày giã gạo lễ hội Pang A', en: 'Silver-clasp com blouse, wooden sword dance in Pang A spring rites' },
  'co-lao': { vi: 'Áo dài xẻ tà nách viền dải vải nhiều màu cao nguyên đá Hà Giang', en: 'Side-slit tunic with colorful fabric ribbons on Dong Van karst plateau' },
  'pu-peo': { vi: 'Áo hai lớp đắp vải màu, váy đen viền đỏ & cúng Thần Rừng', en: 'Two-layer jacket with patchwork appliqué & sacred Forest God rituals' },
  hoa: { vi: 'Áo sườn xám gấm hoa / Áo bà ba cài nút thắt tơ tằm Chợ Lớn', en: 'Brocade cheongsam / Silk buttoned blouse in Cho Lon heritage' },
  'san-diu': { vi: 'Áo dài chàm bốn thân, thắt lưng đỏ & khăn đen vuông gấp nếp', en: 'Four-panel indigo gown, bright red sash & folded black headcloth' },
  ngai: { vi: 'Áo chàm cài khuy vải nách phải & nón lá đan nhỏ nhẹ', en: 'Indigo jacket with right fabric knots & handcrafted light conical hat' },
};

// 2. Đặc trưng kiến trúc nhà ở độc bản 54 Dân tộc Việt Nam
const ETHNIC_ARCHITECTURE_SIGNATURES: Record<string, { vi: string; en: string; type: string }> = {
  kinh: { vi: 'Nhà ngói cổ ba gian hai chái bằng gỗ lim, sân đình gạch Bát Tràng', en: 'Traditional 3-compartment timber house with red tiled roof & communal yard', type: 'Nhà ngói cổ ba gian' },
  muong: { vi: 'Nhà sàn gỗ 4 mái hình mai rùa, bếp lửa đượm hồng giữa nhà sưởi ấm', en: 'Turtle-shell 4-sloped wooden stilt house with continuous central hearth', type: 'Nhà sàn gỗ mai rùa' },
  tho: { vi: 'Nhà sàn mái dốc bằng gỗ, vách nứa, chuyển tiếp kiến trúc Mường - Kinh', en: 'Sloped timber stilt house with bamboo wattle, transitional Muong-Kinh style', type: 'Nhà sàn vách nứa' },
  chut: { vi: 'Nhà sàn nhỏ hoặc nhà trệt vách nứa đơn sơ tựa chân vách núi đá vôi', en: 'Rustic thatched stilt hut or earthen dwelling at limestone karst foot', type: 'Nhà sàn & Nhà trệt vách nứa' },
  tay: { vi: 'Nhà sàn gỗ nghiến to lớn 3-5 gian, mái ngói máng âm dương bên cánh đồng', en: 'Grand ironwood stilt house with yin-yang tiled roof overlooking valleys', type: 'Nhà sàn gỗ nghiến' },
  thai: { vi: 'Nhà sàn Thái đen nóc khau cút gác chéo; nhà sàn Thái trắng mái phẳng thanh thoát', en: 'Black Thai stilt house with crossed khau-cut roof horns; White Thai graceful flat roof', type: 'Nhà sàn nóc Khau Cút' },
  nung: { vi: 'Nhà trình tường đất nện dày giữ ấm hoặc nhà sàn gỗ lợp ngói âm dương', en: 'Thick rammed-earth earthen house or timber stilt house with yin-yang tiles', type: 'Nhà trình tường & Nhà sàn' },
  'san-chay': { vi: 'Nhà sàn gỗ ba gian hai chái hoặc nhà nửa sàn nửa đất ấm cúng', en: 'Three-bay wooden stilt house or cozy semi-stilt semi-ground dwelling', type: 'Nhà sàn & Nửa sàn nửa đất' },
  giay: { vi: 'Nhà sàn 3 gian hoặc nhà đất trình tường bên dòng suối Tả Van', en: 'Three-room stilt house or rammed-earth home along Ta Van mountain streams', type: 'Nhà sàn & Trình tường' },
  lao: { vi: 'Nhà sàn gỗ cao ráo, cầu thang đẽo bậc gỗ nguyên khối vững chãi', en: 'Elevated timber stilt house with solid single-log carved stairs', type: 'Nhà sàn gỗ cao ráo' },
  lu: { vi: 'Nhà sàn 4 mái khang trang vững chãi nép bên thung lũng bản Hon', en: 'Sturdy four-sloped roof stilt house sheltered in Hon village valley', type: 'Nhà sàn 4 mái' },
  'bo-y': { vi: 'Nhà trình tường đất nện mát rượi bao quanh bởi vườn ngô xanh', en: 'Cool rammed-earth house sheltered by green maize terraces', type: 'Nhà trình tường đất nện' },
  hmong: { vi: 'Nhà trình tường đất nện ấm đông mát hè, hàng rào đá xếp tay bao quanh', en: 'Thick rammed-earth house (warm in winter, cool in summer) ringed by stone walls', type: 'Nhà trình tường rào đá' },
  dao: { vi: 'Nhà nửa sàn nửa đất hoặc nhà gỗ pơ-mu giữa rừng hồi quế ngát hương', en: 'Semi-stilt house or aromatic fokienia timber cottage among cinnamon groves', type: 'Nhà nửa sàn nửa đất' },
  'pa-then': { vi: 'Nhà sàn hoặc nhà đất lợp cọ, lưng tựa vách núi vững chãi', en: 'Palm-thatched stilt or earthen house anchored firmly against mountain flanks', type: 'Nhà sàn & Nhà đất' },
  'gia-rai': { vi: 'Nhà rông cao vút như lưỡi búa vươn lên trời & Nhà dài sàn gỗ mẫu hệ', en: 'Towering axe-blade shaped Rong communal house & matriarchal timber longhouse', type: 'Nhà Rông & Nhà Dài' },
  'e-de': { vi: 'Nhà dài hàng chục mét, cầu thang cái khắc đôi bầu sữa mẹ & trăng khuyết', en: 'Dozens-meter matriarchal longhouse with female stairs carved with breasts & crescent', type: 'Nhà Dài Mẫu Hệ' },
  cham: { vi: 'Quần thể tháp gạch nung đỏ bí ẩn (Po Klong Garai, Po Nagar, Mỹ Sơn)', en: 'Sacred red-brick sanctuaries assembled with mortarless millennia techniques', type: 'Tháp gạch nung đỏ Champa' },
  'ra-glai': { vi: 'Nhà sàn nhỏ bằng tre nứa bên sườn đồi, kho thóc tròn dựng riêng', en: 'Small bamboo stilt house on hillside with separate elevated round granary', type: 'Nhà sàn sườn đồi' },
  'chu-ru': { vi: 'Nhà sàn gỗ thấp lợp cỏ tranh ấm cúng bên thung lũng Đơn Dương', en: 'Low thatched-roof wooden stilt house nestled in Don Duong valley', type: 'Nhà sàn gỗ thấp' },
  khmer: { vi: 'Chùa tháp Khmer Nam Bộ lộng lẫy, mái cong nhiều tầng chạm rắn Naga & Krud', en: 'Ornate multi-tier curved temple sanctuaries guarded by sacred Naga & Krud', type: 'Chùa tháp mái cong lộng lẫy' },
  'ba-na': { vi: 'Nhà rông Ba Na hùng vĩ cao 15-20m sừng sững như cánh buồm giữa làng', en: 'Majestic 15-20m soaring Rong communal house shaped like a ship sail', type: 'Nhà Rông đại ngàn' },
  'xo-dang': { vi: 'Nhà rông nóc hình lưỡi rìu ngạo nghễ, cột tròn gỗ quý dãy Ngọc Linh', en: 'Axe-blade pitched Rong house built on massive round ironwood pillars', type: 'Nhà Rông lưỡi rìu' },
  'co-ho': { vi: 'Nhà dài bằng gỗ ván và tre nứa dưới bóng rừng thông Langbiang', en: 'Timber board & bamboo longhouse sheltered beneath Langbiang pine canopy', type: 'Nhà Dài chân núi Langbiang' },
  hre: { vi: 'Nhà sàn lợp tranh mây, hai chái tròn khum khum tựa mũi thuyền', en: 'Rattan-thatched stilt house with two boat-prow rounded end-gables', type: 'Nhà sàn chái mũi thuyền' },
  'm-nong': { vi: 'Nhà trệt vách nứa trét đất hoặc nhà sàn gỗ ven hồ Lắk thơ mộng', en: 'Clay-plastered bamboo ground house or stilt home along scenic Lak lake', type: 'Nhà trệt đất & Nhà sàn ven hồ' },
  'x-tieng': { vi: 'Nhà dài sàn thấp lợp lá mây hoặc cỏ tranh giữa rừng cao su', en: 'Low-floor palm-thatched longhouse amidst lush rubber groves', type: 'Nhà dài sàn thấp' },
  'kho-mu': { vi: 'Nhà sàn gỗ nhỏ ba gian, cửa chính mở đón gió hướng về đỉnh núi', en: 'Three-bay wooden stilt home with front doors welcoming mountain winds', type: 'Nhà sàn ba gian' },
  'bru-van-kieu': { vi: 'Nhà sàn nhỏ hai đầu hồi khum tròn như mai rùa Trường Sơn', en: 'Stilt cottage with rounded turtle-shell gable ends in Truong Son range', type: 'Nhà sàn mai rùa' },
  'co-tu': { vi: 'Nhà Gươl truyền thống sừng sững giữa làng với cây nêu cột lễ rực rỡ', en: 'Sacred Guol community hall standing proud behind colorful ceremonial pole', type: 'Nhà Gươl truyền thống' },
  'gie-trieng': { vi: 'Nhà sàn dài mái tranh dốc đứng, có gian nhà rông riêng của buôn', en: 'Steep thatched-roof stilt longhouse paired with village communal house', type: 'Nhà sàn dài mái dốc' },
  'ta-oi': { vi: 'Nhà Rông cao vút và nhà dài sàn gỗ vách nứa đan A Lưới', en: 'Soaring Rong communal pavilion & woven bamboo stilt longhouse in A Luoi', type: 'Nhà Rông & Nhà Dài sàn gỗ' },
  ma: { vi: 'Nhà dài sàn gỗ có khi dài cả trăm mét bên triền sông Đồng Nai', en: 'Timber longhouse stretching up to 100 meters along Dong Nai riverbank', type: 'Nhà dài trăm mét' },
  co: { vi: 'Nhà sàn dài bằng gỗ mây, vách nứa đan hoa văn ziczac Trà Bồng', en: 'Long stilt house with zigzag woven bamboo screens in Tra Bong', type: 'Nhà sàn vách ziczac' },
  'cho-ro': { vi: 'Nhà trệt vách đất hoặc nhà sàn thấp mộc mạc bên bóng cây rừng', en: 'Earthen-wall ground hut or low stilt home nestled beneath forest shade', type: 'Nhà trệt đất mộc mạc' },
  'xinh-mun': { vi: 'Nhà sàn hai đầu hồi khum tròn hình mai rùa ven dòng sông Mã', en: 'Turtle-shell rounded gable stilt house lining the banks of Ma River', type: 'Nhà sàn khum mai rùa' },
  khang: { vi: 'Nhà sàn gỗ ba gian nhìn ra ngã ba sông Đà và bến thuyền độc mộc', en: 'Three-bay stilt home looking over Da River confluence & dugout canoe dock', type: 'Nhà sàn ven sông Đà' },
  mang: { vi: 'Nhà sàn nhỏ tạm cư ven khe suối sâu huyện Mường Tè', en: 'Small timber-bamboo stilt cottage along deep gorges of Muong Te', type: 'Nhà sàn ven khe suối' },
  'ro-mam': { vi: 'Nhà rông làng Le uy nghiêm và nhà sàn vách nứa san sát Sa Thầy', en: 'Solemn Le village Rong house surrounded by closely-knit bamboo stilt homes', type: 'Nhà Rông làng Le' },
  brau: { vi: 'Nhà sàn tròn độc đáo với mái dốc thoải hình chiếc nón úp làng Đăk Mế', en: 'Unique circular stilt house with conical inverted-hat roof in Dak Me', type: 'Nhà sàn tròn mái nón' },
  'o-du': { vi: 'Nhà sàn nhỏ bằng gỗ xoan, chái phụ làm bếp ấm cúng bản Văng Môn', en: 'Compact chinaberry timber stilt home with warm kitchen annex in Vang Mon', type: 'Nhà sàn gỗ xoan' },
  'ha-nhi': { vi: 'Nhà trình tường đất hình nấm khổng lồ, tường dày 50cm sưởi ấm mùa đông', en: 'Giant mushroom-like earthen house with 50cm rammed earth insulating against frost', type: 'Nhà trình tường hình nấm' },
  'phu-la': { vi: 'Nhà sàn gỗ nhỏ nép bên triền đồi ngô và ruộng bậc thang', en: 'Compact timber stilt cabin tucked against cornfields and terraced tiers', type: 'Nhà sàn sườn đồi' },
  'la-hu': { vi: 'Nhà trình tường đất kiên cố hoặc nhà trệt vách nứa rừng Mường Tè', en: 'Sturdy rammed-earth home or thatched ground hut in virgin Muong Te forests', type: 'Nhà trình tường đất' },
  'lo-lo': { vi: 'Nhà trình tường đất màu nâu ấm áp bên thung lũng đá tai mèo Lũng Cú', en: 'Warm ochre rammed-earth home nestled in karst valley beneath Lung Cu flag tower', type: 'Nhà trình tường Lũng Cú' },
  cong: { vi: 'Nhà sàn gỗ nhỏ nép bên triền đồi ngô ven sông Đà', en: 'Cozy timber stilt home along corn terraces facing Da River shores', type: 'Nhà sàn ven sông' },
  'si-la': { vi: 'Nhà trệt đất vách nứa, nóc lợp cỏ gianh xã Can Hồ', en: 'Bamboo-walled thatched earthen ground cottage in Can Ho commune', type: 'Nhà trệt vách nứa' },
  'la-chi': { vi: 'Nhà sàn 3 gian kết hợp kho thóc lúa ngay trên sàn Hoàng Su Phì', en: 'Three-bay stilt home integrated with on-deck granary across Hoang Su Phi', type: 'Nhà sàn kết hợp kho thóc' },
  'la-ha': { vi: 'Nhà sàn gỗ nhỏ, cầu thang đẽo hình mặt trăng khuyết', en: 'Small timber stilt house with stair treads carved with crescent moons', type: 'Nhà sàn cầu thang trăng khuyết' },
  'co-lao': { vi: 'Nhà trình tường đất nện ấm cúng có hàng rào đá bao quanh Đồng Văn', en: 'Cozy rammed-earth house encircled by handmade limestone fences in Dong Van', type: 'Nhà trình tường rào đá' },
  'pu-peo': { vi: 'Nhà trình tường đất nện hoặc nhà gỗ ván kiên cố cao nguyên đá', en: 'Solid rammed-earth or board-clad house standing tall on karst plateau', type: 'Nhà trình tường cao nguyên đá' },
  hoa: { vi: 'Hội quán, chùa miếu mái ngói lưu ly chạm rồng phượng tinh xảo Chợ Lớn', en: 'Ornate ancestral guildhalls with glazed dragon-and-phoenix roofs in Cho Lon', type: 'Hội quán ngói lưu ly Chợ Lớn' },
  'san-diu': { vi: 'Nhà đất trình tường hoặc xây gạch mộc, mái lợp ngói máng âm dương', en: 'Earthen or raw brick house roofed with traditional yin-yang curved tiles', type: 'Nhà đất ngói âm dương' },
  ngai: { vi: 'Nhà đất gạch nung, cổng ngõ có bờ tường đá mộc mạc yên bình', en: 'Fired-brick earthen homestead framed by peaceful rustic stone entry walls', type: 'Nhà đất gạch nung tường đá' },
};

// 3. Đặc trưng lễ hội & tín ngưỡng 54 Dân tộc Việt Nam
const ETHNIC_FESTIVAL_SIGNATURES: Record<string, { vi: string; en: string; highlightRitual: string }> = {
  kinh: { vi: 'Tết Nguyên Đán, Giỗ Tổ Hùng Vương, Hội Gióng, Hội Lim Quan họ', en: 'Tet Lunar New Year, Hung Kings Commemoration, Giong Festival, Lim Quan Ho singing', highlightRitual: 'Giỗ Tổ Hùng Vương (10/3 âm lịch)' },
  muong: { vi: 'Lễ hội Khai hạ (Xuống đồng) & Dàn cồng chiêng 12 chiếc thiêng', en: 'Khai Ha Spring plowing festival & Sacred 12-gong orchestra welcoming guests', highlightRitual: 'Lễ hội Khai hạ & Cồng chiêng' },
  tho: { vi: 'Lễ hội Bắn trâu & Lễ mừng cơm mới sau mùa thu hoạch', en: 'Buffalo archery festival & New rice harvest Thanksgiving feast', highlightRitual: 'Lễ mừng cơm mới' },
  chut: { vi: 'Lễ cúng Giàng & Lễ lấp lỗ gieo hạt đầu mùa vụ vùng núi đá', en: 'Giang spirit worship & Lap-lo seed sowing ceremony at sowing season', highlightRitual: 'Lễ lấp lỗ gieo hạt' },
  tay: { vi: 'Lễ hội Lồng Tồng (Xuống đồng tung còn) & Đàn Tính Hát Then UNESCO', en: 'Long Tong spring field festival with Con tossing & UNESCO Dan Tinh Then chants', highlightRitual: 'Lễ hội Lồng Tồng & Hát Then' },
  thai: { vi: 'Lễ hội Hoa Ban rợp sắc trắng Tây Bắc & Nghệ thuật Múa Xòe UNESCO', en: 'Ban Flower Spring Festival across Northwest hills & UNESCO Xoe circle dance', highlightRitual: 'Lễ hội Hoa Ban & Múa Xòe' },
  nung: { vi: 'Lễ hội Lồng Tồng & Hội Đền Kỳ Cùng - Tà Phủ với điệu hát Sli đối đáp', en: 'Long Tong down-to-field fest & Ky Cung temple with poetic Sli antiphonal songs', highlightRitual: 'Lễ hội Lồng Tồng & Hát Sli' },
  'san-chay': { vi: 'Hội Sình ca mùa xuân giao duyên nam nữ & Múa xúc tép rộn ràng', en: 'Spring Sinh Ca courtship songfest & celebratory shrimp-catching dance', highlightRitual: 'Hội Sình Ca mùa xuân' },
  giay: { vi: 'Lễ hội Roóng Poọc (xuống đồng Mường Hoa Tả Van) & Múa quạt', en: 'Roong Pooc field opening in Muong Hoa valley & graceful fan dance', highlightRitual: 'Lễ hội Roóng Poọc Tả Van' },
  lao: { vi: 'Tết Bun Vốc Nặm (Lễ hội té nước cầu may) & Múa Lăm vông uyển chuyển', en: 'Bun Voc Nam water-splashing blessings & supple Lam Vong folk dances', highlightRitual: 'Tết Bun Vốc Nặm (Té nước)' },
  lu: { vi: 'Lễ cúng cơm mới & Lễ cúng thần rừng, thần suối bản Hon', en: 'New rice ritual & sacred Forest and Water Spirit offerings in Hon village', highlightRitual: 'Lễ cúng Thần Rừng' },
  'bo-y': { vi: 'Tết Đoan Ngọ & Lễ cúng thần đất tháng Sáu cầu bình an', en: 'Duanwu festival & June Earth God thanksgiving for community serenity', highlightRitual: 'Lễ cúng Thần Đất' },
  hmong: { vi: 'Lễ hội Gầu Tào cầu phúc cầu mệnh, tiếng Khèn Mông & Chợ tình Khau Vai', en: 'Gau Tao festival for children & prosperity, sacred bamboo pipes & Khau Vai love market', highlightRitual: 'Lễ hội Gầu Tào & Múa Khèn' },
  dao: { vi: 'Nghi lễ Cấp Sắc (Quang thảm) trưởng thành, Tết Nhảy & Hát Páo dung', en: 'Cap Sac adult ordination rites, lively Jump Dance & melodic Pao dung songs', highlightRitual: 'Đại lễ Cấp Sắc 3-7-12 đèn' },
  'pa-then': { vi: 'Lễ hội Nhảy Lửa huyền bí chân trần nhảy trên đống than hồng đỏ rực', en: 'Mystical barefoot Fire Dancing festival dancing over blazing wood coals', highlightRitual: 'Lễ hội Nhảy Lửa huyền bí' },
  'gia-rai': { vi: 'Lễ Bỏ Mả (Pơ-thi), Lễ hội Cồng Chiêng Tây Nguyên & Mừng lúa mới', en: 'Po-thi grave abandonment rites, Central Highlands Gong Culture & Harvest rites', highlightRitual: 'Lễ Bỏ Mả (Pơ-thi)' },
  'e-de': { vi: 'Lễ cúng bến nước thiêng, Dàn chiêng Knah & Hội đua voi Buôn Đôn', en: 'Sacred Water Source ritual, Knah gong orchestra & Buon Don Elephant races', highlightRitual: 'Lễ cúng bến nước buôn làng' },
  cham: { vi: 'Đại lễ hội Katê đền tháp, tiếng trống Paranưng, kèn Saranai & Lễ Ramawan', en: 'Grand Kate tower celebration, sacred Paranung drum beats & Ramawan festival', highlightRitual: 'Đại lễ hội Ka-tê đền tháp' },
  'ra-glai': { vi: 'Lễ hội Bỏ mả & Âm thanh đàn đá, đàn Chapi ống tre huyền thoại', en: 'Grave leaving ceremony with ethereal lithophone lithic tones & bamboo Chapi', highlightRitual: 'Lễ hội Bỏ Mả & Đàn Chapi' },
  'chu-ru': { vi: 'Lễ cúng thần bơ-mung (thần đập nước) & Mừng lúa mới', en: 'Bo-mung water dam god ceremony & thanksgiving for golden rice bounty', highlightRitual: 'Lễ cúng Thần Đập Nước' },
  khmer: { vi: 'Tết Chôl Chnăm Thmây, Lễ Đua ghe Ngo Sóc Trăng & Lễ hội cúng Trăng Ok Om Bok', en: 'Chol Chnam Thmay new year, Soc Trang Ngo boat races & Ok Om Bok moon festival', highlightRitual: 'Lễ Đua Ghe Ngo & Ok Om Bok' },
  'ba-na': { vi: 'Lễ hội Đâm trâu tạ ơn Yàng, Cồng chiêng Ba Na & Tiếng đàn T’rưng nứa', en: 'Yang buffalo sacrifice festival, communal gongs & melodic T’rung xylophone', highlightRitual: 'Lễ hội Cồng Chiêng & Đâm Trâu' },
  'xo-dang': { vi: 'Lễ hội Máng nước, Nhạc cụ nước Klông pút & Mừng cơm mới Ngọc Linh', en: 'Water trough blessing, Klong-put bamboo tube resonance & Ngoc Linh new rice', highlightRitual: 'Lễ hội Máng Nước' },
  'co-ho': { vi: 'Lễ hội Nhô Lir Bông (mừng lúa mới) & Tiếng khèn M’buốt chân núi Langbiang', en: 'Nho Lir Bong new harvest fest & M’buot gourd horn echoing beneath Langbiang', highlightRitual: 'Lễ hội Nhô Lir Bông' },
  hre: { vi: 'Lễ ngã rạ (mừng mùa lúa bội thu) & Đàn Brook, điệu hát Ka-choi', en: 'Nga Ra post-harvest joy, Brook folk string lute & lyrical Ka-choi chants', highlightRitual: 'Lễ Ngã Rạ bội thu' },
  'm-nong': { vi: 'Hội đua voi Buôn Đôn, Lễ cúng sức khỏe cho voi & Sử thi Ot Ndrong', en: 'Buon Don elephant racing fest, elephant health blessings & Ot Ndrong epics', highlightRitual: 'Hội Đua Voi Buôn Đôn' },
  'x-tieng': { vi: 'Lễ cúng Yang tạ ơn mùa màng & Dàn cồng chiêng Goong pe 5 chiếc', en: 'Yang agricultural thanksgiving feast & 5-gong sacred Goong Pe rhythm', highlightRitual: 'Lễ cúng Yang tạ ơn mùa màng' },
  'kho-mu': { vi: 'Lễ hội Cầu mùa, Điệu múa tra lúa Tăng bu dập dồn & Cúng bến nước', en: 'Spring harvest supplication, Tang-bu rhythmic rice stomping & water rite', highlightRitual: 'Múa tra lúa Tăng bu' },
  'bru-van-kieu': { vi: 'Lễ đập trống mừng lúa mới & Khèn bè Trường Sơn da diết', en: 'Drum-beating harvest feast & melancholic Truong Son panpipe melodies', highlightRitual: 'Lễ đập trống mừng lúa mới' },
  'co-tu': { vi: 'Lễ Ăn thề kết nghĩa bản làng & Điệu múa Tung tung Da dá dâng trời', en: 'Inter-village brotherhood oath festival & sacred Tung-tung Da-da sky dance', highlightRitual: 'Múa Tung tung Da dá' },
  'gie-trieng': { vi: 'Lễ hội Mừng lúa mới & Tục củi le hứa hôn cúng thần linh', en: 'New rice harvest festival & marriage firewood offering ceremony to spirits', highlightRitual: 'Lễ mừng lúa mới' },
  'ta-oi': { vi: 'Lễ hội Aza mừng mùa bội thu & Đại lễ Ariêu Ping cúng cải táng cầu phúc', en: 'Aza harvest thanksgiving fest & solemn Arieu Ping ossuary blessing ritual', highlightRitual: 'Lễ hội Aza & Ariêu Ping' },
  ma: { vi: 'Lễ đâm trâu tạ ơn thần lúa & Cúng Thần Rừng bên sông Đồng Nai', en: 'Rice god thanksgiving ceremony & Forest God sacrifice along Dong Nai river', highlightRitual: 'Lễ cúng Thần Rừng' },
  co: { vi: 'Lễ hội Điện Trường Bà & Lễ ăn trâu mừng nhà mới Trà Bồng', en: 'Truong Ba shrine festival & buffalo sacrifice welcoming new houses in Tra Bong', highlightRitual: 'Lễ hội Điện Trường Bà' },
  'cho-ro': { vi: 'Lễ hội Sayangva (cúng Thần Lúa) & Lễ Sayangbri (cúng Thần Rừng)', en: 'Sayangva Rice Goddess adoration & Sayangbri sacred Forest God festival', highlightRitual: 'Lễ hội Sayangva cúng Thần Lúa' },
  'xinh-mun': { vi: 'Lễ Mương A Ma (cầu an và tạ ơn thầy thuốc chữa bệnh)', en: 'Muong A Ma ritual blessing community health and honoring native shamans', highlightRitual: 'Lễ Mương A Ma' },
  khang: { vi: 'Lễ Kin Pang Cúng cầu phúc & Lễ hội chèo thuyền đuôi én sông Đà', en: 'Kin Pang Cung health prayers & swift swallow-tail canoe regatta on Da River', highlightRitual: 'Lễ hội thuyền đuôi én' },
  mang: { vi: 'Lễ cúng cơm mới & Lễ cúng thần ngô sườn núi Mường Tè', en: 'New rice tasting ceremony & Corn Goddess harvest supplication in Muong Te', highlightRitual: 'Lễ cúng cơm mới' },
  'ro-mam': { vi: 'Lễ mở cửa kho lúa sau mùa gặt bội thu làng Le Sa Thầy', en: 'Granary doorway opening ceremony celebrating bountiful grain bins in Le village', highlightRitual: 'Lễ mở cửa kho lúa' },
  brau: { vi: 'Lễ hội Ăn than mừng nhà rông & Âm vang bộ Cồng chiêng Tha huyền bí', en: 'Charcoal banquet welcoming newly-built Rong house & mystical Tha gong pair', highlightRitual: 'Cồng chiêng Tha huyền bí' },
  'o-du': { vi: 'Lễ đón tiếng sấm đầu năm (Tết Chăm phtrong của người Ơ Đu)', en: 'First Thunder of Spring celebration (Cham Phtrong New Year of the O Du)', highlightRitual: 'Lễ đón tiếng sấm đầu năm' },
  'ha-nhi': { vi: 'Lễ hội Khô Già Già (cầu an mùa hạ) & Tết Ga Tho Tho ruộng bậc thang Y Tý', en: 'Kho Gia Gia mid-year peace ritual & Ga Tho Tho winter new year on Y Ty slopes', highlightRitual: 'Lễ hội Khô Già Già' },
  'phu-la': { vi: 'Lễ hội Quét làng xua đuổi tà khí mùa xuân & Múa xòe nón', en: 'Spring village cleansing rite dispelling ill fortune & delicate conical hat dance', highlightRitual: 'Lễ hội Quét làng' },
  'la-hu': { vi: 'Lễ hội Cơm mới & Tết Cá mùa thu hoạch ven dòng sông Đà', en: 'New rice harvest thanksgiving & Fish Festival welcoming autumn abundance', highlightRitual: 'Tết Cá mùa thu hoạch' },
  'lo-lo': { vi: 'Lễ hội Cầu mưa, Lễ rửa làng & Múa tiếng Trống Đồng cổ linh thiêng', en: 'Rain petition ritual, Village Purification & sacred Ancient Bronze Drum dance', highlightRitual: 'Lễ hội Cầu Mưa & Trống Đồng' },
  cong: { vi: 'Lễ hội Hoa mào gà (Tết truyền thống người Cống đón năm mới)', en: 'Cockscomb Flower Festival (solemn annual new year celebration of Cong people)', highlightRitual: 'Lễ hội Hoa Mào Gà' },
  'si-la': { vi: 'Lễ hội Cơm mới & Lễ cúng hồn lúa sau mùa gặt bản Can Hồ', en: 'New rice harvest ritual & Rice Soul invocation in Can Ho village', highlightRitual: 'Lễ cúng hồn lúa' },
  'la-chi': { vi: 'Tết Khu Cù Tê (tháng Bảy âm lịch) với tiếng trống đồng Hoàng Su Phì', en: 'Khu Cu Te July festival with echoes of ancestral bronze drums in Hoang Su Phi', highlightRitual: 'Tết Khu Cù Tê' },
  'la-ha': { vi: 'Lễ hội Pang A Nụn Ban dâng hoa măng cầu sức khỏe mùa xuân', en: 'Pang A Nun Ban bamboo shoot flower rite petitioning springtime vitality', highlightRitual: 'Lễ hội Pang A' },
  'co-lao': { vi: 'Lễ cúng Thần Rừng tháng Năm & Lễ mừng cơm mới cao nguyên đá', en: 'May Forest God veneration & New rice harvest feast on northern karst cliffs', highlightRitual: 'Lễ cúng Thần Rừng' },
  'pu-peo': { vi: 'Lễ cúng Thần Rừng mùng 6 tháng 6 âm lịch bảo vệ môi trường sinh thái', en: 'June 6 lunar Forest God liturgy safeguarding ancestral alpine ecology', highlightRitual: 'Lễ cúng Thần Rừng' },
  hoa: { vi: 'Tết Nguyên Tiêu lồng đèn đỏ, Múa lân sư rồng & Lễ hội Chùa Bà Thiên Hậu', en: 'Lantern Festival, Lion & Dragon dances & Thien Hau Pagoda festival', highlightRitual: 'Tết Nguyên Tiêu & Chùa Bà' },
  'san-diu': { vi: 'Lễ hội Đại phan cầu an, Tục leo thang dao & Làn điệu Soọng cô', en: 'Dai Phan supplication rite, knife-ladder ascent & Soong Co lyrical duets', highlightRitual: 'Lễ hội Đại Phan' },
  ngai: { vi: 'Tết Thanh Minh & Lễ tạ ơn mùa màng, hát Sường cô giao duyên', en: 'Tomb Sweeping Festival, harvest thanksgiving rites & Suong Co love duets', highlightRitual: 'Hát Sường Cô giao duyên' },
};

// 4. Helper lấy hình ảnh xác thực cho từng phần: Trang phục, Kiến trúc, Lễ hội
export const getEthnicCostumeImage = (group: EthnicGroupDetail): string => {
  const customCostumeMap: Record<string, string> = {
    thai: thaiKhanPieuImg,
    dao: daoHeaddressImg,
    hmong: hmongBatikCostumeImg,
    cham: chamCultureDanceImg,
    tay: tayDanTinhThenImg,
  };
  return customCostumeMap[group.id] || group.featureImageUrl || group.imageUrl;
};

export const getEthnicArchitectureImage = (group: EthnicGroupDetail): string => {
  return group.architectureImageUrl || ETHNIC_ARCHITECTURE_IMAGES[group.id] || nhaSanTayBacImg;
};

export const getEthnicFestivalImage = (group: EthnicGroupDetail): string => {
  return group.festivalImageUrl || ETHNIC_FESTIVAL_IMAGES[group.id] || leHoiCongChiengImg;
};

export const CultureAndHeritage: React.FC<CultureAndHeritageProps> = ({ currentLang }) => {
  const [activeTab, setActiveTab] = useState<'ethnic' | 'monuments'>('ethnic');
  const [selectedEthnic, setSelectedEthnic] = useState<EthnicGroupDetail>(ALL_54_ETHNIC_GROUPS[0]);
  const [selectedMonument, setSelectedMonument] = useState<HistoricMonument>(HISTORIC_MONUMENTS[0]);
  const [zoomedEthnicImage, setZoomedEthnicImage] = useState<EthnicGroupDetail | null>(null);
  const [ethnicDisplayMode, setEthnicDisplayMode] = useState<'grid' | 'split'>('grid');
  const [modalImageMode, setModalImageMode] = useState<'characteristic' | 'portrait'>('characteristic');
  
  // Tab filter inside modal: all (cả 3 phần), costume (trang phục), architecture (kiến trúc), festival (lễ hội)
  const [modalActiveTab, setModalActiveTab] = useState<'all' | 'costume' | 'architecture' | 'festival'>('all');
  // Photo zoom popup (lightbox khi bấm vào từng ảnh)
  const [zoomedPhoto, setZoomedPhoto] = useState<{ url: string; title: string; subtitle: string } | null>(null);

  // 🌟 Image aspect toggles for visual exploration across 54 ethnic groups
  const [modalAspect, setModalAspect] = useState<'costume' | 'architecture' | 'festival'>('costume');
  const [splitViewAspect, setSplitViewAspect] = useState<'costume' | 'architecture' | 'festival'>('costume');
  const [cardImageAspects, setCardImageAspects] = useState<Record<string, 'costume' | 'architecture' | 'festival'>>({});

  // Filters for 54 Ethnic Groups
  const [searchEthnicQuery, setSearchEthnicQuery] = useState('');
  const [selectedFamily, setSelectedFamily] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  // Filtered ethnic groups with 3-pillar intelligence
  const filteredEthnicGroups = useMemo(() => {
    return ALL_54_ETHNIC_GROUPS.filter((group) => {
      const matchesFamily = selectedFamily === 'all' || group.linguisticFamily === selectedFamily;
      const matchesRegion =
        selectedRegion === 'all' ||
        (selectedRegion === 'tay-bac' && group.regionVi.includes('Tây Bắc')) ||
        (selectedRegion === 'dong-bac' && group.regionVi.includes('Đông Bắc')) ||
        (selectedRegion === 'dong-bang' && group.regionVi.includes('Đồng Bằng')) ||
        (selectedRegion === 'tay-nguyen' && group.regionVi.includes('Tây Nguyên')) ||
        (selectedRegion === 'mien-trung-nam' && (group.regionVi.includes('Duyên Hải') || group.regionVi.includes('Nam Bộ')));

      const query = searchEthnicQuery.trim().toLowerCase();
      const koData = KO_54_ETHNIC_GROUPS[group.id];
      const matchesSearch =
        !query ||
        group.name.toLowerCase().includes(query) ||
        (group.otherNames && group.otherNames.toLowerCase().includes(query)) ||
        group.residence.toLowerCase().includes(query) ||
        group.culturalHighlight.toLowerCase().includes(query) ||
        group.traditionalCostume.toLowerCase().includes(query) ||
        group.architecture.toLowerCase().includes(query) ||
        group.festivals.toLowerCase().includes(query) ||
        group.linguisticGroupVi.toLowerCase().includes(query) ||
        (koData && (
          koData.nameKo.toLowerCase().includes(query) ||
          (koData.otherNamesKo && koData.otherNamesKo.toLowerCase().includes(query)) ||
          koData.regionKo.toLowerCase().includes(query) ||
          koData.linguisticGroupKo.toLowerCase().includes(query) ||
          koData.residenceKo.toLowerCase().includes(query) ||
          koData.costumeKo.toLowerCase().includes(query) ||
          koData.architectureKo.toLowerCase().includes(query) ||
          koData.festivalKo.toLowerCase().includes(query) ||
          koData.culturalHighlightKo.toLowerCase().includes(query)
        ));

      return matchesFamily && matchesRegion && matchesSearch;
    });
  }, [searchEthnicQuery, selectedFamily, selectedRegion]);

  // Modal navigation handlers
  const handleNextEthnicModal = () => {
    if (!zoomedEthnicImage) return;
    const currentIndex = ALL_54_ETHNIC_GROUPS.findIndex((g) => g.id === zoomedEthnicImage.id);
    const nextIndex = (currentIndex + 1) % ALL_54_ETHNIC_GROUPS.length;
    setZoomedEthnicImage(ALL_54_ETHNIC_GROUPS[nextIndex]);
  };

  const handlePrevEthnicModal = () => {
    if (!zoomedEthnicImage) return;
    const currentIndex = ALL_54_ETHNIC_GROUPS.findIndex((g) => g.id === zoomedEthnicImage.id);
    const prevIndex = (currentIndex - 1 + ALL_54_ETHNIC_GROUPS.length) % ALL_54_ETHNIC_GROUPS.length;
    setZoomedEthnicImage(ALL_54_ETHNIC_GROUPS[prevIndex]);
  };

  const handleInspectEthnic = (
    group: EthnicGroupDetail,
    aspectOrTab?: 'all' | 'costume' | 'architecture' | 'festival'
  ) => {
    setSelectedEthnic(group);
    setZoomedEthnicImage(group);
    if (aspectOrTab === 'all' || !aspectOrTab) {
      setModalActiveTab('all');
      setModalAspect('costume');
    } else {
      setModalActiveTab(aspectOrTab);
      setModalAspect(aspectOrTab);
    }
  };

  return (
    <section id="heritage" className="py-14 sm:py-20 bg-gradient-to-b from-[#fbf8f4] via-sky-50/20 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#faf4ed] text-[#78350f] text-xs font-bold uppercase tracking-wider mb-2 border border-[#e8ded1] shadow-2xs">
            <BookOpen className="w-3.5 h-3.5 text-[#b45309]" />
            <span>
              {currentLang === 'vi'
                ? 'Bảo Tồn & Tôn Vinh Di Sản Dân Tộc'
                : currentLang === 'ko'
                ? '베트남 민족 문화유산 보존 & 계승'
                : 'Preserving Vietnam’s Heritage'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {currentLang === 'vi'
              ? 'Trọn Vẹn Bản Sắc 54 Dân Tộc & Công Trình Lịch Sử'
              : currentLang === 'ko'
              ? '54개 민족 문화 정수 & 유구한 역사 건축'
              : 'Complete 54 Ethnic Groups & Historic Architecture'}
          </h2>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            {currentLang === 'vi'
              ? 'Việt Nam là mái nhà chung thống nhất, keo sơn của đầy đủ 54 dân tộc anh em thuộc 8 nhóm ngữ hệ chính, cùng lịch sử dựng nước hào hùng được lưu dấu qua những đền đài, thành quách và di tích ngàn năm.'
              : currentLang === 'ko'
              ? '베트남은 8대 주요 어족에 속하는 54개 형제 민족이 굳건히 단결한 통일된 보금자리이며, 수천 년의 건국과 수호 역사가 신성한 사원, 성곽, 역사 유적에 생생히 새겨져 있습니다.'
              : 'Vietnam is the unified homeland of 54 brotherly ethnic groups spanning 8 linguistic families, with profound traditions expressed in costumes, music, architecture, and enduring historic monuments.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-1 rounded-2xl border border-stone-200/80 shadow-xs inline-flex gap-1">
            <button
              onClick={() => setActiveTab('ethnic')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'ethnic'
                  ? 'bg-[#78350f] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#78350f]'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>
                {currentLang === 'vi'
                  ? 'Bản Sắc Đầy Đủ 54 Dân Tộc'
                  : currentLang === 'ko'
                  ? '54개 민족 문화 정수'
                  : 'Full 54 Ethnic Groups'}
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ml-1 ${
                activeTab === 'ethnic' ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-700'
              }`}>
                54
              </span>
            </button>
            <button
              onClick={() => setActiveTab('monuments')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'monuments'
                  ? 'bg-red-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-red-700'
              }`}
            >
              <Landmark className="w-4 h-4" />
              <span>
                {currentLang === 'vi'
                  ? 'Di Tích & Kiến Trúc Lịch Sử'
                  : currentLang === 'ko'
                  ? '역사 유적 & 전통 건축'
                  : 'Historic Monuments'}
              </span>
            </button>
          </div>
        </div>

        {/* Tab 1: Full 54 Ethnic Groups Showcase */}
        {activeTab === 'ethnic' && (
          <div className="space-y-8">
            {/* Filter & Search Toolbar */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-sky-100 shadow-xs space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Search Bar */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchEthnicQuery}
                    onChange={(e) => setSearchEthnicQuery(e.target.value)}
                    placeholder={
                      currentLang === 'vi'
                        ? 'Tìm kiếm theo tên dân tộc, tên gọi khác, địa bàn (ví dụ: Kinh, Mông, Thái, Dao, Ê Đê, Lô Lô...)'
                        : currentLang === 'ko'
                        ? '민족명, 다른 명칭, 거주지 검색 (예: 낀, 흐몽, 타이, 자오, 에데, 바나, 참...)'
                        : 'Search by ethnic name, alias, residence (e.g. Kinh, Hmong, Thai, Dao, E De...)'
                    }
                    className="w-full pl-10 pr-9 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-hidden focus:border-sky-500 focus:bg-white text-slate-800"
                  />
                  {searchEthnicQuery && (
                    <button
                      onClick={() => setSearchEthnicQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Region Selector */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">
                    {currentLang === 'vi' ? 'Vùng miền:' : currentLang === 'ko' ? '지역:' : 'Region:'}
                  </span>
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="text-xs px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium focus:outline-hidden focus:border-sky-500"
                  >
                    {REGIONS_FILTER.map((reg) => {
                      const regKo: Record<string, string> = {
                        all: '전국 3대 지역 (전체)',
                        MienBac: '베트남 북부 (동북·서북)',
                        MienTrung: '중부 & 고원 (떠이응우옌)',
                        MienNam: '베트남 남부 (호치민·메콩)',
                      };
                      return (
                        <option key={reg.id} value={reg.id}>
                          {currentLang === 'vi' ? reg.nameVi : currentLang === 'ko' ? regKo[reg.id] || reg.nameVi : reg.nameVi}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {/* Display Mode Toggle */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl shrink-0">
                  <button
                    onClick={() => setEthnicDisplayMode('grid')}
                    title={
                      currentLang === 'vi'
                        ? 'Xem bộ sưu tập lưới ảnh 54 dân tộc'
                        : currentLang === 'ko'
                        ? '54개 민족 포토 그리드 갤러리'
                        : 'Grid gallery view'
                    }
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      ethnicDisplayMode === 'grid'
                        ? 'bg-white text-sky-700 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span>
                      {currentLang === 'vi'
                        ? 'Lưới ảnh 54 dân tộc'
                        : currentLang === 'ko'
                        ? '포토 그리드'
                        : 'Photo Grid'}
                    </span>
                  </button>
                  <button
                    onClick={() => setEthnicDisplayMode('split')}
                    title={
                      currentLang === 'vi'
                        ? 'Xem danh sách & tiêu điểm chi tiết'
                        : currentLang === 'ko'
                        ? '상세 목록 & 스포트라이트'
                        : 'List & Spotlight view'
                    }
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      ethnicDisplayMode === 'split'
                        ? 'bg-white text-sky-700 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Columns2 className="w-3.5 h-3.5" />
                    <span>
                      {currentLang === 'vi'
                        ? 'Danh sách chi tiết'
                        : currentLang === 'ko'
                        ? '상세 목록'
                        : 'List & Detail'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Linguistic Families Pills */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    {currentLang === 'vi'
                      ? 'Lọc theo Nhóm Ngữ Hệ (8 nhóm ngôn ngữ chính):'
                      : currentLang === 'ko'
                      ? '어파별 분류 (8대 핵심 어파):'
                      : 'Filter by Linguistic Group:'}
                  </span>
                  <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-100">
                    {currentLang === 'vi'
                      ? `Hiển thị: ${filteredEthnicGroups.length} / 54 dân tộc anh em`
                      : currentLang === 'ko'
                      ? `표시 중: 54개 형제 민족 중 ${filteredEthnicGroups.length}개 민족`
                      : `Displaying: ${filteredEthnicGroups.length} / 54 ethnic groups`}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {LINGUISTIC_FAMILIES.map((fam) => {
                    const isFamActive = selectedFamily === fam.id;
                    const famKo: Record<string, string> = {
                      all: '전체 (54개 민족)',
                      'viet-muong': '비엣-므엉 어파',
                      'tay-thai': '따이-타이 어파',
                      'mon-khmer': '몬-크메르 어파',
                      'hmong-dao': '흐몽-자오 어파',
                      kadai: '카다이 어파',
                      'nam-dao': '오스트로네시아 어파',
                      han: '한장 어파',
                      'tang-mieu': '티베트-미얀마 어파',
                    };
                    return (
                      <button
                        key={fam.id}
                        onClick={() => setSelectedFamily(fam.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                          isFamActive
                            ? 'bg-sky-600 text-white shadow-xs font-bold'
                            : 'bg-slate-50 text-slate-700 border border-slate-200/80 hover:bg-sky-50 hover:text-sky-700'
                        }`}
                      >
                        <span>
                          {currentLang === 'vi'
                            ? fam.nameVi
                            : currentLang === 'ko'
                            ? famKo[fam.id] || fam.nameVi
                            : fam.nameEn}
                        </span>
                        <span
                          className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                            isFamActive ? 'bg-sky-500/50 text-white' : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {fam.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Mode 1: Photo Grid of All 54 Ethnic Groups */}
            {ethnicDisplayMode === 'grid' && (
              <div>
                {filteredEthnicGroups.length === 0 ? (
                  <div className="p-12 text-center bg-white rounded-3xl border border-sky-100 text-slate-500">
                    <p className="text-sm font-semibold">
                      {currentLang === 'vi'
                        ? 'Không tìm thấy dân tộc phù hợp'
                        : currentLang === 'ko'
                        ? '조건에 맞는 민족을 찾을 수 없습니다'
                        : 'No matching ethnic group found'}
                    </p>
                    <button
                      onClick={() => {
                        setSearchEthnicQuery('');
                        setSelectedFamily('all');
                        setSelectedRegion('all');
                      }}
                      className="mt-3 px-4 py-2 bg-sky-600 text-white rounded-xl text-xs font-bold hover:bg-sky-700 transition-colors cursor-pointer"
                    >
                      {currentLang === 'vi'
                        ? 'Xóa bộ lọc để xem lại toàn bộ 54 dân tộc'
                        : currentLang === 'ko'
                        ? '필터를 초기화하여 전체 54개 민족 보기'
                        : 'Reset filters'}
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {filteredEthnicGroups.map((group) => {
                      const globalIndex = ALL_54_ETHNIC_GROUPS.findIndex((g) => g.id === group.id) + 1;
                      const koItem = KO_54_ETHNIC_GROUPS[group.id];
                      const displayName = currentLang === 'ko' && koItem ? koItem.nameKo : group.name;
                      const displayOtherNames = currentLang === 'ko' && koItem ? koItem.otherNamesKo : group.otherNames;
                      const displayRegion = currentLang === 'ko' && koItem ? koItem.regionKo : group.regionVi;
                      const cardDisplayImg = getEthnicCostumeImage(group);

                      return (
                        <div
                          key={group.id}
                          onClick={() => handleInspectEthnic(group, 'all')}
                          className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-950 border border-stone-200/90 hover:border-amber-400 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col aspect-[3/4]"
                          title={
                            currentLang === 'vi'
                              ? `Nhấp xem thông tin & hình ảnh: Trang phục, Kiến trúc, Lễ hội của dân tộc ${displayName}`
                              : currentLang === 'ko'
                              ? `${displayName}의 전통 의상, 주거 건축, 민속 축제 사진 & 정보 보기`
                              : `Click to view costume, architecture, and festivals of ${displayName}`
                          }
                        >
                          {/* Authentic Ethnic Portrait & Traditional Attire Image */}
                          <img
                            src={cardDisplayImg}
                            alt={displayName}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                          />

                          {/* Top Badges */}
                          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                            <span className="px-2.5 py-1 rounded-lg bg-sky-600/90 backdrop-blur-xs text-white text-[11px] font-black shadow-xs tracking-wider">
                              #{globalIndex < 10 ? `0${globalIndex}` : globalIndex}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-amber-300 text-[10px] font-bold">
                              {displayRegion}
                            </span>
                          </div>

                          {/* Gradient shadow at bottom to make ethnic name pop */}
                          <div className="absolute inset-x-0 bottom-0 h-32 sm:h-36 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent pointer-events-none" />

                          {/* Bottom Ethnic Name & Quick Inspect Cue */}
                          <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4 z-10 text-white flex flex-col justify-end">
                            <h3 className="text-base sm:text-lg font-black text-white group-hover:text-amber-300 transition-colors drop-shadow-md leading-tight">
                              {displayName}
                            </h3>
                            {displayOtherNames && (
                              <p className="text-[11px] text-amber-200/90 line-clamp-1 mt-0.5 font-medium">
                                {displayOtherNames}
                              </p>
                            )}

                            {/* Clean cue: Trang phục • Kiến trúc • Lễ hội */}
                            <div className="mt-2 pt-2 border-t border-white/15 flex items-center justify-between text-[11px] text-amber-300 font-semibold opacity-90 group-hover:opacity-100 transition-opacity">
                              <span className="truncate">
                                {currentLang === 'vi'
                                  ? 'Trang phục • Kiến trúc • Lễ hội'
                                  : currentLang === 'ko'
                                  ? '의상 • 주거 • 축제 보기'
                                  : 'Costume • Architecture • Festivals'}
                              </span>
                              <ChevronRight className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-1 transition-transform text-amber-400" />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Mode 2: Split View (List + Deep Dive Detail) */}
            {ethnicDisplayMode === 'split' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: 54 Ethnic Groups List */}
                <div className="lg:col-span-5 space-y-2.5">
                  <div className="flex items-center justify-between px-1">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      {currentLang === 'vi'
                        ? 'Danh sách 54 Dân Tộc Việt Nam:'
                        : currentLang === 'ko'
                        ? '베트남 54개 민족 목록:'
                        : 'List of 54 Ethnic Groups:'}
                    </p>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {currentLang === 'vi'
                        ? '(Bấm chọn để xem chi tiết)'
                        : currentLang === 'ko'
                        ? '(선택하여 상세 정보를 확인하세요)'
                        : '(Click to view details)'}
                    </span>
                  </div>

                  {filteredEthnicGroups.length === 0 ? (
                    <div className="p-8 text-center bg-white rounded-2xl border border-sky-100 text-slate-500">
                      <p className="text-sm font-semibold">
                        {currentLang === 'vi'
                          ? 'Không tìm thấy dân tộc phù hợp'
                          : currentLang === 'ko'
                          ? '조건에 맞는 민족을 찾을 수 없습니다'
                          : 'No matching ethnic group found'}
                      </p>
                      <button
                        onClick={() => {
                          setSearchEthnicQuery('');
                          setSelectedFamily('all');
                          setSelectedRegion('all');
                        }}
                        className="mt-2 text-xs text-sky-600 font-bold hover:underline cursor-pointer"
                      >
                        {currentLang === 'vi'
                          ? 'Xóa bộ lọc để xem lại toàn bộ 54 dân tộc'
                          : currentLang === 'ko'
                          ? '필터를 초기화하여 전체 54개 민족 보기'
                          : 'Reset filters'}
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-[660px] overflow-y-auto pr-2 custom-scrollbar">
                      {filteredEthnicGroups.map((group) => {
                        const globalIndex = ALL_54_ETHNIC_GROUPS.findIndex((g) => g.id === group.id) + 1;
                        const isSelected = selectedEthnic.id === group.id;
                        const koItem = KO_54_ETHNIC_GROUPS[group.id];
                        const displayName = currentLang === 'ko' && koItem ? koItem.nameKo : group.name;
                        const displayOtherNames = currentLang === 'ko' && koItem ? koItem.otherNamesKo : group.otherNames;
                        const displayLinguisticGroup = currentLang === 'ko' && koItem ? koItem.linguisticGroupKo : group.linguisticGroupVi;

                        return (
                          <button
                            key={group.id}
                            onClick={() => setSelectedEthnic(group)}
                            className={`w-full p-3 rounded-2xl text-left transition-all border flex items-center justify-between cursor-pointer ${
                              isSelected
                                ? 'bg-sky-600 text-white border-sky-700 shadow-md shadow-sky-200'
                                : 'bg-white text-slate-800 border-sky-100/80 hover:bg-sky-50/70'
                            }`}
                          >
                            <div className="flex items-center gap-3.5 min-w-0">
                              <span
                                className={`w-7 text-[11px] font-black shrink-0 text-center ${
                                  isSelected ? 'text-sky-200' : 'text-slate-400'
                                }`}
                              >
                                #{globalIndex < 10 ? `0${globalIndex}` : globalIndex}
                              </span>
                              <img
                                src={group.imageUrl}
                                alt={displayName}
                                referrerPolicy="no-referrer"
                                className="w-14 h-14 rounded-xl object-cover shrink-0 border border-black/10 shadow-xs"
                              />
                              <div className="min-w-0">
                                <h4 className="text-xs font-bold leading-tight truncate">{displayName}</h4>
                                {displayOtherNames && (
                                  <p
                                    className={`text-[10px] truncate mt-0.5 ${
                                      isSelected ? 'text-amber-200' : 'text-amber-700'
                                    }`}
                                  >
                                    {displayOtherNames}
                                  </p>
                                )}
                                <p
                                  className={`text-[11px] truncate mt-0.5 ${
                                    isSelected ? 'text-sky-100' : 'text-slate-500'
                                  }`}
                                >
                                  {displayLinguisticGroup}
                                </p>
                              </div>
                            </div>
                            <ChevronRight
                              className={`w-4 h-4 shrink-0 ml-2 ${isSelected ? 'text-white' : 'text-slate-400'}`}
                            />
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Right Column: Detailed View of Selected Group */}
                <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-xs">
                  {(() => {
                    const koSelected = KO_54_ETHNIC_GROUPS[selectedEthnic.id];
                    const selectedDisplayName = currentLang === 'ko' && koSelected ? koSelected.nameKo : selectedEthnic.name;
                    const selectedDisplayOtherNames = currentLang === 'ko' && koSelected ? koSelected.otherNamesKo : selectedEthnic.otherNames;
                    const selectedDisplayRegion = currentLang === 'ko' && koSelected ? koSelected.regionKo : selectedEthnic.regionVi;
                    const selectedDisplayLinguistic = currentLang === 'ko' && koSelected ? koSelected.linguisticGroupKo : selectedEthnic.linguisticGroupVi;
                    const selectedDisplayResidence = currentLang === 'ko' && koSelected ? koSelected.residenceKo : selectedEthnic.residence;
                    const selectedDisplayPopulation = currentLang === 'ko' && koSelected ? koSelected.populationEstimateKo : selectedEthnic.populationEstimate;
                    const selectedDisplayCostume = currentLang === 'ko' && koSelected ? koSelected.costumeKo : (selectedEthnic.visualHighlights?.costume || selectedEthnic.traditionalCostume);
                    const selectedDisplayArchitecture = currentLang === 'ko' && koSelected ? koSelected.architectureKo : (selectedEthnic.visualHighlights?.architecture || selectedEthnic.architecture);
                    const selectedDisplayFestival = currentLang === 'ko' && koSelected ? koSelected.festivalKo : (selectedEthnic.visualHighlights?.festivalInstrument || selectedEthnic.festivals);
                    const selectedDisplayHighlight = currentLang === 'ko' && koSelected ? koSelected.culturalHighlightKo : selectedEthnic.culturalHighlight;
                    const selectedSignatureCostume = currentLang === 'ko' ? (koSelected?.costumeKo || KO_ETHNIC_SIGNATURES[selectedEthnic.id]?.costumeKo || ETHNIC_COSTUME_SIGNATURES[selectedEthnic.id]?.en) : currentLang === 'vi' ? ETHNIC_COSTUME_SIGNATURES[selectedEthnic.id]?.vi : ETHNIC_COSTUME_SIGNATURES[selectedEthnic.id]?.en;
                    const selectedSignatureArch = currentLang === 'ko' ? (koSelected?.architectureKo || KO_ETHNIC_SIGNATURES[selectedEthnic.id]?.architectureKo || ETHNIC_ARCHITECTURE_SIGNATURES[selectedEthnic.id]?.en) : currentLang === 'vi' ? ETHNIC_ARCHITECTURE_SIGNATURES[selectedEthnic.id]?.vi : ETHNIC_ARCHITECTURE_SIGNATURES[selectedEthnic.id]?.en;
                    const selectedSignatureFest = currentLang === 'ko' ? (koSelected?.festivalKo || KO_ETHNIC_SIGNATURES[selectedEthnic.id]?.festivalKo || ETHNIC_FESTIVAL_SIGNATURES[selectedEthnic.id]?.en) : currentLang === 'vi' ? ETHNIC_FESTIVAL_SIGNATURES[selectedEthnic.id]?.vi : ETHNIC_FESTIVAL_SIGNATURES[selectedEthnic.id]?.en;

                    return (
                      <>
                        {/* Image with 3-Way Aspect View Switcher */}
                        <div className="mb-6">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                              <Camera className="w-3.5 h-3.5 text-amber-600" />
                              <span>
                                {currentLang === 'vi'
                                  ? 'Khám phá hình ảnh theo nét đặc trưng:'
                                  : currentLang === 'ko'
                                  ? '문화적 특징별 사진 탐색:'
                                  : 'Explore imagery by cultural feature:'}
                              </span>
                            </span>
                            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
                              <button
                                onClick={() => setSplitViewAspect('costume')}
                                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                                  splitViewAspect === 'costume'
                                    ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                                    : 'text-slate-600 hover:text-slate-900'
                                }`}
                              >
                                <span>👘</span>
                                <span>{currentLang === 'vi' ? 'Trang Phục' : currentLang === 'ko' ? '전통 의상' : 'Costume'}</span>
                              </button>
                              <button
                                onClick={() => setSplitViewAspect('architecture')}
                                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                                  splitViewAspect === 'architecture'
                                    ? 'bg-sky-500 text-white font-black shadow-xs'
                                    : 'text-slate-600 hover:text-slate-900'
                                }`}
                              >
                                <span>🏡</span>
                                <span>{currentLang === 'vi' ? 'Kiến Trúc Nhà Ở' : currentLang === 'ko' ? '주거 건축' : 'Architecture'}</span>
                              </button>
                              <button
                                onClick={() => setSplitViewAspect('festival')}
                                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                                  splitViewAspect === 'festival'
                                    ? 'bg-purple-500 text-white font-black shadow-xs'
                                    : 'text-slate-600 hover:text-slate-900'
                                }`}
                              >
                                <span>🎉</span>
                                <span>{currentLang === 'vi' ? 'Lễ Hội & Nghi Lễ' : currentLang === 'ko' ? '전통 축제' : 'Festivals'}</span>
                              </button>
                            </div>
                          </div>

                          <div
                            onClick={() => handleInspectEthnic(selectedEthnic, splitViewAspect)}
                            className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-slate-100 cursor-pointer group"
                          >
                            <img
                              src={
                                splitViewAspect === 'architecture'
                                  ? selectedEthnic.architectureImageUrl || ETHNIC_ARCHITECTURE_IMAGES[selectedEthnic.id] || nhaSanTayBacImg
                                  : splitViewAspect === 'festival'
                                  ? selectedEthnic.festivalImageUrl || ETHNIC_FESTIVAL_IMAGES[selectedEthnic.id] || leHoiCongChiengImg
                                  : modalImageMode === 'portrait' && selectedEthnic.featureImageUrl
                                  ? selectedEthnic.featureImageUrl
                                  : selectedEthnic.imageUrl
                              }
                              alt={selectedDisplayName}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/30 to-transparent" />
                            
                            {/* Top Badges */}
                            <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-2">
                              <span className="px-2.5 py-1 rounded-md bg-sky-600/90 backdrop-blur-xs text-white text-[11px] font-bold">
                                {selectedDisplayLinguistic}
                              </span>
                              <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-xs text-amber-300 text-[11px] font-bold">
                                {selectedDisplayRegion}
                              </span>
                              {splitViewAspect === 'architecture' && (
                                <span className="px-2.5 py-1 rounded-md bg-sky-600 text-white text-[11px] font-extrabold flex items-center gap-1 shadow-xs">
                                  <Home className="w-3 h-3" />
                                  <span>
                                    {currentLang === 'vi'
                                      ? 'Ảnh Kiến Trúc Nhà Ở'
                                      : currentLang === 'ko'
                                      ? '주거 건축 양식 사진'
                                      : 'Architecture View'}
                                  </span>
                                </span>
                              )}
                              {splitViewAspect === 'festival' && (
                                <span className="px-2.5 py-1 rounded-md bg-purple-600 text-white text-[11px] font-extrabold flex items-center gap-1 shadow-xs">
                                  <Music className="w-3 h-3" />
                                  <span>
                                    {currentLang === 'vi'
                                      ? 'Ảnh Lễ Hội Truyền Thống'
                                      : currentLang === 'ko'
                                      ? '전통 축제 사진'
                                      : 'Festival View'}
                                  </span>
                                </span>
                              )}
                            </div>

                            {/* Top Right Zoom Button */}
                            <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5">
                              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                                <Maximize2 className="w-3 h-3" />
                                {currentLang === 'vi' ? 'Soi chi tiết lớn' : currentLang === 'ko' ? '사진 확대' : 'Inspect zoom'}
                              </span>
                              <span className="sm:hidden p-1.5 rounded-md bg-black/60 text-white">
                                <Maximize2 className="w-3.5 h-3.5" />
                              </span>
                            </div>

                            {/* Bottom Info */}
                            <div className="absolute bottom-4 left-4 right-4 text-white">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="px-2 py-0.5 rounded bg-sky-500 text-white text-[10px] font-black">
                                  #{ALL_54_ETHNIC_GROUPS.findIndex((g) => g.id === selectedEthnic.id) + 1}
                                </span>
                                <h3 className="text-2xl sm:text-3xl font-black">{selectedDisplayName}</h3>
                              </div>
                              {selectedDisplayOtherNames && (
                                <p className="text-xs text-amber-200 mt-0.5">
                                  {currentLang === 'vi' ? 'Tên gọi khác:' : currentLang === 'ko' ? '다른 명칭:' : 'Other names:'}{' '}
                                  <span className="text-white font-medium">{selectedDisplayOtherNames}</span>
                                </p>
                              )}
                              <p className="text-xs text-sky-200 mt-1 line-clamp-1">{selectedDisplayResidence}</p>
                            </div>
                          </div>
                        </div>

                        {/* Distinctive tags if available */}
                        {selectedEthnic.characteristicTags && selectedEthnic.characteristicTags.length > 0 && (
                          <div className="mb-4 flex flex-wrap items-center gap-1.5 p-3 rounded-2xl bg-amber-50/70 border border-amber-200/70">
                            <span className="text-xs font-bold text-amber-900 mr-1 flex items-center gap-1">
                              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                              {currentLang === 'vi' ? 'Dấu ấn đặc trưng:' : currentLang === 'ko' ? '핵심 문화 특징:' : 'Key features:'}
                            </span>
                            {selectedEthnic.characteristicTags.map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className="px-2.5 py-0.8 rounded-lg bg-white text-amber-900 border border-amber-300 text-xs font-bold shadow-2xs"
                              >
                                ✨ {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Detailed Information Panels */}
                        <div className="space-y-3.5 text-xs">
                          {/* Population & Residence */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                              <span className="font-bold text-slate-800 block mb-0.5">
                                👥 {currentLang === 'vi' ? 'Dân số ước tính:' : currentLang === 'ko' ? '추정 인구:' : 'Population:'}
                              </span>
                              <p className="text-slate-600 leading-relaxed">{selectedDisplayPopulation}</p>
                            </div>

                            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                              <span className="font-bold text-slate-800 block mb-0.5">
                                📍 {currentLang === 'vi' ? 'Địa bàn cư trú chính:' : currentLang === 'ko' ? '주요 거주 지역:' : 'Primary Residence:'}
                              </span>
                              <p className="text-slate-600 leading-relaxed">{selectedDisplayResidence}</p>
                            </div>
                          </div>

                          {/* 3 Pillars of Distinctive Culture (Trang Phục - Kiến Trúc Nhà Ở - Lễ Hội) */}
                          <div className="space-y-3">
                            {/* Pillar 1: Trang Phục */}
                            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
                              <div className="flex items-center justify-between gap-2">
                                <span className="font-bold text-amber-950 flex items-center gap-1.5 text-xs">
                                  <Shirt className="w-4 h-4 text-amber-700" />
                                  {currentLang === 'vi'
                                    ? '1. Đặc Trưng Trang Phục & Thổ Cẩm:'
                                    : currentLang === 'ko'
                                    ? '1. 고유 전통 의상 & 직조 공예:'
                                    : '1. Traditional Costume & Attire:'}
                                </span>
                                {(ETHNIC_COSTUME_SIGNATURES[selectedEthnic.id] || koSelected) && (
                                  <span className="px-2 py-0.5 rounded-md bg-amber-200/80 text-amber-950 font-bold text-[10px]">
                                    {currentLang === 'vi' ? 'Dấu ấn độc bản' : currentLang === 'ko' ? '고유한 특징' : 'Signature'}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs font-bold text-amber-900 leading-snug">
                                ✨ {selectedSignatureCostume}
                              </p>
                              <p className="text-slate-700 leading-relaxed text-xs">
                                {selectedDisplayCostume}
                              </p>

                              {/* Hình ảnh trang phục truyền thống thực tế */}
                              <div
                                onClick={() => handleInspectEthnic(selectedEthnic, 'costume')}
                                className="relative rounded-xl overflow-hidden aspect-[21/9] sm:aspect-[24/9] border border-amber-200/90 group/costumeImg cursor-pointer shadow-xs"
                              >
                                <img
                                  src={getEthnicCostumeImage(selectedEthnic)}
                                  alt="Trang phục truyền thống"
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-cover group-hover/costumeImg:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-between p-2.5">
                                  <span className="text-[11px] font-bold text-white flex items-center gap-1">
                                    <Shirt className="w-3.5 h-3.5 text-amber-300" />
                                    <span>
                                      {currentLang === 'vi'
                                        ? 'Trang phục cổ truyền'
                                        : currentLang === 'ko'
                                        ? '전통 복식'
                                        : 'Traditional Costume'}
                                    </span>
                                  </span>
                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500 text-slate-950 flex items-center gap-1 shadow-xs group-hover/costumeImg:bg-amber-400">
                                    <Maximize2 className="w-2.5 h-2.5" />
                                    <span>{currentLang === 'vi' ? 'Xem ảnh lớn' : currentLang === 'ko' ? '사진 확대' : 'Inspect'}</span>
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Pillar 2: Kiến Trúc Nhà Ở kèm Hình Ảnh Minh Họa Thực Tế */}
                            <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200/80 space-y-2.5">
                              <div className="flex items-center justify-between gap-2">
                                <span className="font-bold text-sky-950 flex items-center gap-1.5 text-xs">
                                  <Home className="w-4 h-4 text-sky-700" />
                                  {currentLang === 'vi'
                                    ? '2. Đặc Trưng Kiến Trúc Nhà Ở:'
                                    : currentLang === 'ko'
                                    ? '2. 주거 건축 & 전통 가옥:'
                                    : '2. Traditional Architecture & Dwellings:'}
                                </span>
                                {ETHNIC_ARCHITECTURE_SIGNATURES[selectedEthnic.id] && (
                                  <span className="px-2 py-0.5 rounded-md bg-sky-200/80 text-sky-950 font-bold text-[10px]">
                                    {currentLang === 'ko' ? (koSelected?.architectureKo ? '전통 가옥' : ETHNIC_ARCHITECTURE_SIGNATURES[selectedEthnic.id].type) : ETHNIC_ARCHITECTURE_SIGNATURES[selectedEthnic.id].type}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs font-bold text-sky-900 leading-snug">
                                🏡 {selectedSignatureArch}
                              </p>
                              <p className="text-slate-700 leading-relaxed text-xs">
                                {selectedDisplayArchitecture}
                              </p>

                              {/* Hình ảnh kiến trúc nếp nhà thực tế */}
                              <div
                                onClick={() => handleInspectEthnic(selectedEthnic, 'architecture')}
                                className="relative rounded-xl overflow-hidden aspect-[21/9] sm:aspect-[24/9] border border-sky-200/90 group/archImg cursor-pointer shadow-xs"
                              >
                                <img
                                  src={selectedEthnic.architectureImageUrl || ETHNIC_ARCHITECTURE_IMAGES[selectedEthnic.id] || nhaSanTayBacImg}
                                  alt="Kiến trúc nhà ở"
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-cover group-hover/archImg:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-between p-2.5">
                                  <span className="text-[11px] font-bold text-white flex items-center gap-1">
                                    <Home className="w-3.5 h-3.5 text-sky-300" />
                                    <span>
                                      {currentLang === 'ko'
                                        ? (koSelected?.architectureKo || '전통 주거 양식')
                                        : (ETHNIC_ARCHITECTURE_SIGNATURES[selectedEthnic.id]?.type || 'Nếp nhà cổ truyền')}
                                    </span>
                                  </span>
                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-500 text-white flex items-center gap-1 shadow-xs group-hover/archImg:bg-sky-400">
                                    <Maximize2 className="w-2.5 h-2.5" />
                                    <span>{currentLang === 'vi' ? 'Xem ảnh lớn' : currentLang === 'ko' ? '사진 확대' : 'Inspect'}</span>
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Pillar 3: Lễ Hội & Phong Tục kèm Hình Ảnh Minh Họa Thực Tế */}
                            <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200/80 space-y-2.5">
                              <div className="flex items-center justify-between gap-2">
                                <span className="font-bold text-purple-950 flex items-center gap-1.5 text-xs">
                                  <Music className="w-4 h-4 text-purple-700" />
                                  {currentLang === 'vi'
                                    ? '3. Đặc Trưng Lễ Hội & Tín Ngưỡng:'
                                    : currentLang === 'ko'
                                    ? '3. 전통 축제 & 민속 신앙:'
                                    : '3. Festivals & Living Heritage:'}
                                </span>
                                {ETHNIC_FESTIVAL_SIGNATURES[selectedEthnic.id] && (
                                  <span className="px-2 py-0.5 rounded-md bg-purple-200/80 text-purple-950 font-bold text-[10px]">
                                    {currentLang === 'ko' ? (koSelected?.festivalKo ? '전통 의례' : ETHNIC_FESTIVAL_SIGNATURES[selectedEthnic.id].highlightRitual) : ETHNIC_FESTIVAL_SIGNATURES[selectedEthnic.id].highlightRitual}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs font-bold text-purple-900 leading-snug">
                                🎉 {selectedSignatureFest}
                              </p>
                              <p className="text-slate-700 leading-relaxed text-xs">
                                {selectedDisplayFestival}
                              </p>

                              {/* Hình ảnh lễ hội dân gian thực tế */}
                              <div
                                onClick={() => handleInspectEthnic(selectedEthnic, 'festival')}
                                className="relative rounded-xl overflow-hidden aspect-[21/9] sm:aspect-[24/9] border border-purple-200/90 group/festImg cursor-pointer shadow-xs"
                              >
                                <img
                                  src={selectedEthnic.festivalImageUrl || ETHNIC_FESTIVAL_IMAGES[selectedEthnic.id] || leHoiCongChiengImg}
                                  alt="Lễ hội truyền thống"
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-cover group-hover/festImg:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-between p-2.5">
                                  <span className="text-[11px] font-bold text-white flex items-center gap-1">
                                    <Music className="w-3.5 h-3.5 text-purple-300" />
                                    <span>
                                      {currentLang === 'ko'
                                        ? (koSelected?.festivalKo || '대표 민속 축제')
                                        : (ETHNIC_FESTIVAL_SIGNATURES[selectedEthnic.id]?.highlightRitual || 'Lễ hội truyền thống')}
                                    </span>
                                  </span>
                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500 text-white flex items-center gap-1 shadow-xs group-hover/festImg:bg-purple-400">
                                    <Maximize2 className="w-2.5 h-2.5" />
                                    <span>{currentLang === 'vi' ? 'Xem ảnh lớn' : currentLang === 'ko' ? '사진 확대' : 'Inspect'}</span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Cultural Highlight */}
                          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                            <span className="font-bold text-slate-800 block mb-1">
                              📖 {currentLang === 'vi'
                                ? 'Bản Sắc Văn Hóa & Lịch Sử Nổi Bật:'
                                : currentLang === 'ko'
                                ? '문화적 정체성 & 역사적 스토리:'
                                : 'Cultural Highlights & Living Lore:'}
                            </span>
                            <p className="text-slate-700 leading-relaxed">{selectedDisplayHighlight}</p>
                          </div>
                        </div>

                        {/* Audio explanation button */}
                        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <p className="text-xs text-slate-500">
                            {currentLang === 'vi'
                              ? 'Lắng nghe giọng đọc thuyết minh về bản sắc của đồng bào:'
                              : currentLang === 'ko'
                              ? '이 민족의 문화적 정체성에 대한 오디오 가이드 청취:'
                              : 'Listen to narration of this ethnic group:'}
                          </p>
                          <button
                            onClick={() => {
                              const narrationText = currentLang === 'ko' && koSelected
                                ? `${koSelected.nameKo}. ${koSelected.linguisticGroupKo}. 거주지: ${koSelected.residenceKo}. ${koSelected.culturalHighlightKo}. 전통 복식: ${koSelected.costumeKo}. 전통 건축: ${koSelected.architectureKo}. 대표 축제: ${koSelected.festivalKo}`
                                : `${selectedEthnic.name}. Thuộc nhóm ngôn ngữ ${selectedEthnic.linguisticGroupVi}. Địa bàn cư trú: ${selectedEthnic.residence}. ${selectedEthnic.culturalHighlight}. Trang phục truyền thống: ${selectedEthnic.traditionalCostume}. Kiến trúc: ${selectedEthnic.architecture}. Lễ hội: ${selectedEthnic.festivals}`;
                              playVoiceGuide(narrationText, currentLang);
                            }}
                            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs whitespace-nowrap"
                          >
                            <Volume2 className="w-4 h-4" />
                            <span>{currentLang === 'vi' ? 'Nghe Thuyết Minh Chuẩn' : currentLang === 'ko' ? '오디오 가이드 듣기' : 'Listen Narration'}</span>
                          </button>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Historic Monuments Showcase */}
        {activeTab === 'monuments' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {HISTORIC_MONUMENTS.map((item) => {
              const monKo = KO_MONUMENTS[item.id];
              const monName = currentLang === 'ko' && monKo?.nameKo ? monKo.nameKo : item.name;
              const monPeriod = currentLang === 'ko' && monKo?.periodKo ? monKo.periodKo : item.period;
              const monLocation = currentLang === 'ko' && monKo?.locationKo ? monKo.locationKo : item.location;
              const monHistory = currentLang === 'ko' && monKo?.historyKo ? monKo.historyKo : item.historicalValue;
              const monArch = currentLang === 'ko' && monKo?.highlightKo ? monKo.highlightKo : item.architecturalStyle;

              return (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-5 border border-sky-100 shadow-xs hover:shadow-lg hover:border-sky-200 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4">
                    <img
                      src={item.imageUrl}
                      alt={monName}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-white text-[11px] font-bold">
                      {monLocation}
                    </div>
                  </div>

                  <span className="text-[11px] font-bold text-sky-600 uppercase tracking-wider block mb-1">
                    {monPeriod}
                  </span>
                  <h4 className="text-lg font-black text-slate-900 mb-2 leading-tight">
                    {monName}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed mb-3 line-clamp-3">
                    {monHistory}
                  </p>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600 mb-3">
                    <strong className="text-slate-800 block mb-0.5">
                      {currentLang === 'vi' ? 'Đặc sắc kiến trúc: ' : currentLang === 'ko' ? '건축적 특징: ' : 'Architectural style: '}
                    </strong>
                    <p className="line-clamp-2">{monArch}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">
                      {currentLang === 'vi' ? 'Giá vé tham quan' : currentLang === 'ko' ? '입장료' : 'Entry ticket'}
                    </span>
                    <span className="font-bold text-slate-800">{item.ticketPrice}</span>
                  </div>

                  <button
                    onClick={() =>
                      playVoiceGuide(
                        `${monName} tại ${monLocation}. ${monHistory}. Kiến trúc: ${monArch}`,
                        currentLang
                      )
                    }
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-sky-100 hover:bg-sky-200 text-sky-700 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-sky-600" />
                    <span>{currentLang === 'vi' ? 'Nghe lịch sử' : currentLang === 'ko' ? '오디오 듣기' : 'Listen'}</span>
                  </button>
                </div>
              </div>
            );
          })}
          </div>
        )}

        {/* Ethnic Costume & Living Culture Zoom Lightbox Modal */}
        {zoomedEthnicImage && (() => {
          const koModal = KO_54_ETHNIC_GROUPS[zoomedEthnicImage.id];
          const modalDisplayName = currentLang === 'ko' && koModal ? koModal.nameKo : zoomedEthnicImage.name;
          const modalDisplayOtherNames = currentLang === 'ko' && koModal ? koModal.otherNamesKo : zoomedEthnicImage.otherNames;
          const modalDisplayRegion = currentLang === 'ko' && koModal ? koModal.regionKo : zoomedEthnicImage.regionVi;
          const modalDisplayLinguistic = currentLang === 'ko' && koModal ? koModal.linguisticGroupKo : zoomedEthnicImage.linguisticGroupVi;
          const modalDisplayResidence = currentLang === 'ko' && koModal ? koModal.residenceKo : zoomedEthnicImage.residence;
          const modalDisplayCostume = currentLang === 'ko' && koModal ? koModal.costumeKo : (zoomedEthnicImage.visualHighlights?.costume || zoomedEthnicImage.traditionalCostume);
          const modalDisplayArchitecture = currentLang === 'ko' && koModal ? koModal.architectureKo : (zoomedEthnicImage.visualHighlights?.architecture || zoomedEthnicImage.architecture);
          const modalDisplayFestival = currentLang === 'ko' && koModal ? koModal.festivalKo : (zoomedEthnicImage.visualHighlights?.festivalInstrument || zoomedEthnicImage.festivals);
          const modalDisplayHighlight = currentLang === 'ko' && koModal ? koModal.culturalHighlightKo : zoomedEthnicImage.culturalHighlight;
          const modalSignatureCostume = currentLang === 'ko' ? (koModal?.costumeKo || KO_ETHNIC_SIGNATURES[zoomedEthnicImage.id]?.costumeKo || ETHNIC_COSTUME_SIGNATURES[zoomedEthnicImage.id]?.en) : currentLang === 'vi' ? ETHNIC_COSTUME_SIGNATURES[zoomedEthnicImage.id]?.vi : ETHNIC_COSTUME_SIGNATURES[zoomedEthnicImage.id]?.en;
          const modalSignatureArch = currentLang === 'ko' ? (koModal?.architectureKo || KO_ETHNIC_SIGNATURES[zoomedEthnicImage.id]?.architectureKo || ETHNIC_ARCHITECTURE_SIGNATURES[zoomedEthnicImage.id]?.en) : currentLang === 'vi' ? ETHNIC_ARCHITECTURE_SIGNATURES[zoomedEthnicImage.id]?.vi : ETHNIC_ARCHITECTURE_SIGNATURES[zoomedEthnicImage.id]?.en;
          const modalSignatureFest = currentLang === 'ko' ? (koModal?.festivalKo || KO_ETHNIC_SIGNATURES[zoomedEthnicImage.id]?.festivalKo || ETHNIC_FESTIVAL_SIGNATURES[zoomedEthnicImage.id]?.en) : currentLang === 'vi' ? ETHNIC_FESTIVAL_SIGNATURES[zoomedEthnicImage.id]?.vi : ETHNIC_FESTIVAL_SIGNATURES[zoomedEthnicImage.id]?.en;

          return (
            <div
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200"
              onClick={() => setZoomedEthnicImage(null)}
            >
              <div
                className="bg-slate-900 border border-slate-700/80 rounded-3xl overflow-hidden max-w-5xl w-full max-h-[94vh] flex flex-col shadow-2xl relative text-white"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-800 shrink-0 gap-3 bg-slate-950/70">
                  <div className="flex items-center gap-2 flex-wrap min-w-0">
                    <span className="px-2.5 py-1 rounded-md bg-amber-500 text-slate-950 text-xs font-black shadow-xs">
                      #{ALL_54_ETHNIC_GROUPS.findIndex((g) => g.id === zoomedEthnicImage.id) + 1} / 54
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-slate-800 text-sky-300 text-xs font-bold border border-slate-700">
                      {modalDisplayLinguistic}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 text-xs font-semibold">
                      {modalDisplayRegion}
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-white ml-1 truncate">
                      {modalDisplayName}
                    </h4>
                    {modalDisplayOtherNames && (
                      <span className="text-xs text-amber-200/80 font-medium hidden md:inline truncate">
                        ({modalDisplayOtherNames})
                      </span>
                    )}
                  </div>

                  {/* Header Actions (Prev, Next, Audio, Close) */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={handlePrevEthnicModal}
                      title={currentLang === 'vi' ? 'Dân tộc trước' : currentLang === 'ko' ? '이전 민족' : 'Previous'}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-all cursor-pointer border border-slate-700"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNextEthnicModal}
                      title={currentLang === 'vi' ? 'Dân tộc tiếp theo' : currentLang === 'ko' ? '다음 민족' : 'Next'}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-all cursor-pointer border border-slate-700"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        const narrationText =
                          currentLang === 'ko' && koModal
                            ? `${koModal.nameKo}. 전통 복식: ${koModal.costumeKo}. 주거 건축: ${koModal.architectureKo}. 대표 축제: ${koModal.festivalKo}. 문화적 정체성: ${koModal.culturalHighlightKo}`
                            : `Dân tộc ${zoomedEthnicImage.name}. 
                              Phần 1: Trang phục đặc trưng: ${ETHNIC_COSTUME_SIGNATURES[zoomedEthnicImage.id]?.vi || zoomedEthnicImage.traditionalCostume}. ${zoomedEthnicImage.traditionalCostume}. 
                              Phần 2: Kiến trúc nhà ở: ${ETHNIC_ARCHITECTURE_SIGNATURES[zoomedEthnicImage.id]?.type || ''}, ${ETHNIC_ARCHITECTURE_SIGNATURES[zoomedEthnicImage.id]?.vi || zoomedEthnicImage.architecture}. ${zoomedEthnicImage.architecture}. 
                              Phần 3: Lễ hội truyền thống: ${ETHNIC_FESTIVAL_SIGNATURES[zoomedEthnicImage.id]?.highlightRitual || ''}, ${ETHNIC_FESTIVAL_SIGNATURES[zoomedEthnicImage.id]?.vi || zoomedEthnicImage.festivals}. ${zoomedEthnicImage.festivals}`;
                        playVoiceGuide(narrationText, currentLang);
                      }}
                      title={currentLang === 'vi' ? 'Nghe thuyết minh đặc trưng' : currentLang === 'ko' ? '오디오 해설 듣기' : 'Listen Narration'}
                      className="p-2 sm:px-3 sm:py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-xs"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span className="hidden sm:inline">
                        {currentLang === 'vi' ? 'Thuyết minh' : currentLang === 'ko' ? '음성 해설' : 'Audio'}
                      </span>
                    </button>
                    <button
                      onClick={() => setZoomedEthnicImage(null)}
                      className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Đóng (Close)"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Tab Switcher for the 3 Cultural Parts */}
                <div className="px-4 sm:px-6 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
                  <span className="text-xs font-bold text-slate-400 mr-2 shrink-0 hidden sm:inline">
                    {currentLang === 'vi' ? 'Xem các phần:' : currentLang === 'ko' ? '탐색 분류:' : 'Sections:'}
                  </span>
                  <button
                    onClick={() => setModalActiveTab('all')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                      modalActiveTab === 'all'
                        ? 'bg-white text-slate-950 font-black shadow-xs'
                        : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>✨</span>
                    <span>{currentLang === 'vi' ? 'Cả 3 Phần Bản Sắc' : currentLang === 'ko' ? '3대 영역 전체' : 'All 3 Sections'}</span>
                  </button>
                  <button
                    onClick={() => setModalActiveTab('costume')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                      modalActiveTab === 'costume'
                        ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                        : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>👘</span>
                    <span>{currentLang === 'vi' ? '1. Trang Phục Đặc Trưng' : currentLang === 'ko' ? '1. 전통 복식' : '1. Costume'}</span>
                  </button>
                  <button
                    onClick={() => setModalActiveTab('architecture')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                      modalActiveTab === 'architecture'
                        ? 'bg-sky-500 text-white font-black shadow-xs'
                        : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>🏡</span>
                    <span>{currentLang === 'vi' ? '2. Kiến Trúc Nhà Ở' : currentLang === 'ko' ? '2. 주거 건축' : '2. Architecture'}</span>
                  </button>
                  <button
                    onClick={() => setModalActiveTab('festival')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                      modalActiveTab === 'festival'
                        ? 'bg-purple-500 text-white font-black shadow-xs'
                        : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>🎉</span>
                    <span>{currentLang === 'vi' ? '3. Lễ Hội & Phong Tục' : currentLang === 'ko' ? '3. 전통 축제' : '3. Festivals'}</span>
                  </button>
                </div>

                {/* Modal Scrollable Body */}
                <div className="overflow-y-auto custom-scrollbar flex-1 p-4 sm:p-6 space-y-6 bg-slate-900">
                  {/* Characteristic Tags Chips */}
                  {zoomedEthnicImage.characteristicTags && zoomedEthnicImage.characteristicTags.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
                      <span className="text-xs font-bold text-amber-400 mr-1 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        {currentLang === 'vi' ? 'Dấu ấn đặc trưng:' : currentLang === 'ko' ? '주요 특징:' : 'Key features:'}
                      </span>
                      {zoomedEthnicImage.characteristicTags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-0.8 rounded-lg bg-amber-400/15 text-amber-300 border border-amber-400/30 text-xs font-bold"
                        >
                          ✨ {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* ===================== PHẦN 1: TRANG PHỤC ĐẶC TRƯNG ===================== */}
                  {(modalActiveTab === 'all' || modalActiveTab === 'costume') && (() => {
                    const costumeImg = getEthnicCostumeImage(zoomedEthnicImage);
                    return (
                      <div className="rounded-3xl bg-slate-950 border border-amber-500/40 p-4 sm:p-6 shadow-xl space-y-4">
                        <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
                          <h5 className="text-base sm:text-lg font-black text-amber-300 flex items-center gap-2">
                            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                              <Shirt className="w-5 h-5" />
                            </span>
                            <span>
                              {currentLang === 'vi'
                                ? '1. Trang Phục Đặc Trưng Độc Bản'
                                : currentLang === 'ko'
                                ? '1. 고유 전통 의상 & 직조 문양'
                                : '1. Traditional Costume & Attire'}
                            </span>
                          </h5>
                          <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold">
                            👘 {currentLang === 'vi' ? 'Có ảnh trang phục' : currentLang === 'ko' ? '의상 사진 포함' : 'With photo'}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                          {/* Dedicated Costume Image */}
                          <div
                            onClick={() =>
                              setZoomedPhoto({
                                url: costumeImg,
                                title: `${modalDisplayName} - Trang Phục Đặc Trưng`,
                                subtitle: modalSignatureCostume,
                              })
                            }
                            className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-amber-500/30 group/cImg cursor-pointer shadow-md"
                          >
                            <img
                              src={costumeImg}
                              alt={`${modalDisplayName} - Trang phục`}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover/cImg:scale-106 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end justify-between p-3">
                              <span className="text-[11px] font-bold text-amber-200 flex items-center gap-1 bg-black/60 px-2 py-1 rounded-md backdrop-blur-xs">
                                <Shirt className="w-3.5 h-3.5 text-amber-400" />
                                <span>{currentLang === 'vi' ? 'Ảnh trang phục' : currentLang === 'ko' ? '의상 사진' : 'Costume photo'}</span>
                              </span>
                              <span className="text-[10px] font-black px-2 py-1 rounded-md bg-amber-500 text-slate-950 flex items-center gap-1 shadow-xs group-hover/cImg:bg-amber-400">
                                <Maximize2 className="w-3 h-3" />
                                <span>{currentLang === 'vi' ? 'Phóng to' : currentLang === 'ko' ? '확대' : 'Zoom'}</span>
                              </span>
                            </div>
                          </div>

                          {/* Dedicated Costume Details */}
                          <div className="lg:col-span-7 space-y-3">
                            <div className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-700/50">
                              <span className="text-xs font-bold text-amber-400 block mb-1">
                                ✨ {currentLang === 'vi' ? 'Nét độc bản nhận diện:' : currentLang === 'ko' ? '고유 시그니처 특징:' : 'Signature Accent:'}
                              </span>
                              <p className="text-sm font-bold text-amber-200 leading-snug">
                                {modalSignatureCostume}
                              </p>
                            </div>

                            <div>
                              <span className="text-xs font-bold text-slate-300 block mb-1.5 uppercase tracking-wider">
                                📖 {currentLang === 'vi' ? 'Thông tin chi tiết về trang phục & họa tiết:' : currentLang === 'ko' ? '의상 상세 정보 & 직조 기법:' : 'Costume & Brocade Details:'}
                              </span>
                              <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-line bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                                {modalDisplayCostume}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* ===================== PHẦN 2: KIẾN TRÚC NHÀ Ở ===================== */}
                  {(modalActiveTab === 'all' || modalActiveTab === 'architecture') && (() => {
                    const archImg = getEthnicArchitectureImage(zoomedEthnicImage);
                    const archType = ETHNIC_ARCHITECTURE_SIGNATURES[zoomedEthnicImage.id]?.type;
                    return (
                      <div className="rounded-3xl bg-slate-950 border border-sky-500/40 p-4 sm:p-6 shadow-xl space-y-4">
                        <div className="flex items-center justify-between border-b border-sky-500/20 pb-3">
                          <h5 className="text-base sm:text-lg font-black text-sky-300 flex items-center gap-2">
                            <span className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400">
                              <Home className="w-5 h-5" />
                            </span>
                            <span>
                              {currentLang === 'vi'
                                ? '2. Kiến Trúc Nhà Ở & Không Gian Sống'
                                : currentLang === 'ko'
                                ? '2. 주거 건축 & 전통 가옥 양식'
                                : '2. Traditional Architecture & Dwellings'}
                            </span>
                          </h5>
                          {archType && (
                            <span className="px-2.5 py-1 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-500/40 text-xs font-bold">
                              🏡 {currentLang === 'ko' && koModal?.architectureKo ? '전통 가옥' : archType}
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                          {/* Dedicated Architecture Image */}
                          <div
                            onClick={() =>
                              setZoomedPhoto({
                                url: archImg,
                                title: `${modalDisplayName} - Kiến Trúc Nhà Ở`,
                                subtitle: modalSignatureArch,
                              })
                            }
                            className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-sky-500/30 group/aImg cursor-pointer shadow-md"
                          >
                            <img
                              src={archImg}
                              alt={`${modalDisplayName} - Kiến trúc nhà ở`}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover/aImg:scale-106 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end justify-between p-3">
                              <span className="text-[11px] font-bold text-sky-200 flex items-center gap-1 bg-black/60 px-2 py-1 rounded-md backdrop-blur-xs">
                                <Home className="w-3.5 h-3.5 text-sky-400" />
                                <span>{currentLang === 'vi' ? 'Ảnh kiến trúc' : currentLang === 'ko' ? '건축 사진' : 'Architecture photo'}</span>
                              </span>
                              <span className="text-[10px] font-black px-2 py-1 rounded-md bg-sky-500 text-white flex items-center gap-1 shadow-xs group-hover/aImg:bg-sky-400">
                                <Maximize2 className="w-3 h-3" />
                                <span>{currentLang === 'vi' ? 'Phóng to' : currentLang === 'ko' ? '확대' : 'Zoom'}</span>
                              </span>
                            </div>
                          </div>

                          {/* Dedicated Architecture Details */}
                          <div className="lg:col-span-7 space-y-3">
                            <div className="p-3.5 rounded-2xl bg-sky-950/30 border border-sky-700/50">
                              <span className="text-xs font-bold text-sky-400 block mb-1">
                                🏡 {currentLang === 'vi' ? 'Nếp nhà & kết cấu đặc trưng:' : currentLang === 'ko' ? '전통 가옥 구조 & 특징:' : 'Architectural Signature:'}
                              </span>
                              <p className="text-sm font-bold text-sky-200 leading-snug">
                                {modalSignatureArch}
                              </p>
                            </div>

                            <div>
                              <span className="text-xs font-bold text-slate-300 block mb-1.5 uppercase tracking-wider">
                                📖 {currentLang === 'vi' ? 'Thông tin chi tiết về kiến trúc & nếp nhà:' : currentLang === 'ko' ? '가옥 건축 재료 & 생활 공간:' : 'Dwelling Structure & Living Space:'}
                              </span>
                              <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-line bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                                {modalDisplayArchitecture}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* ===================== PHẦN 3: LỄ HỘI TRUYỀN THỐNG ===================== */}
                  {(modalActiveTab === 'all' || modalActiveTab === 'festival') && (() => {
                    const festImg = getEthnicFestivalImage(zoomedEthnicImage);
                    const festRitual = ETHNIC_FESTIVAL_SIGNATURES[zoomedEthnicImage.id]?.highlightRitual;
                    return (
                      <div className="rounded-3xl bg-slate-950 border border-purple-500/40 p-4 sm:p-6 shadow-xl space-y-4">
                        <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
                          <h5 className="text-base sm:text-lg font-black text-purple-300 flex items-center gap-2">
                            <span className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400">
                              <Music className="w-5 h-5" />
                            </span>
                            <span>
                              {currentLang === 'vi'
                                ? '3. Lễ Hội Tiêu Biểu & Âm Vang Bản Sắc'
                                : currentLang === 'ko'
                                ? '3. 대표 민속 축제 & 전통 신앙'
                                : '3. Living Festivals & Sacred Rituals'}
                            </span>
                          </h5>
                          {festRitual && (
                            <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-bold">
                              🎉 {currentLang === 'ko' && koModal?.festivalKo ? '전통 의례' : festRitual}
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                          {/* Dedicated Festival Image */}
                          <div
                            onClick={() =>
                              setZoomedPhoto({
                                url: festImg,
                                title: `${modalDisplayName} - Lễ Hội & Nghi Lễ`,
                                subtitle: modalSignatureFest,
                              })
                            }
                            className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-purple-500/30 group/fImg cursor-pointer shadow-md"
                          >
                            <img
                              src={festImg}
                              alt={`${modalDisplayName} - Lễ hội truyền thống`}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover/fImg:scale-106 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end justify-between p-3">
                              <span className="text-[11px] font-bold text-purple-200 flex items-center gap-1 bg-black/60 px-2 py-1 rounded-md backdrop-blur-xs">
                                <Music className="w-3.5 h-3.5 text-purple-400" />
                                <span>{currentLang === 'vi' ? 'Ảnh lễ hội' : currentLang === 'ko' ? '축제 사진' : 'Festival photo'}</span>
                              </span>
                              <span className="text-[10px] font-black px-2 py-1 rounded-md bg-purple-500 text-white flex items-center gap-1 shadow-xs group-hover/fImg:bg-purple-400">
                                <Maximize2 className="w-3 h-3" />
                                <span>{currentLang === 'vi' ? 'Phóng to' : currentLang === 'ko' ? '확대' : 'Zoom'}</span>
                              </span>
                            </div>
                          </div>

                          {/* Dedicated Festival Details */}
                          <div className="lg:col-span-7 space-y-3">
                            <div className="p-3.5 rounded-2xl bg-purple-950/30 border border-purple-700/50">
                              <span className="text-xs font-bold text-purple-400 block mb-1">
                                🎉 {currentLang === 'vi' ? 'Nghi lễ & âm hưởng tâm linh tiêu biểu:' : currentLang === 'ko' ? '대표 의례 & 전통 악기:' : 'Sacred Ritual & Music:'}
                              </span>
                              <p className="text-sm font-bold text-purple-200 leading-snug">
                                {modalSignatureFest}
                              </p>
                            </div>

                            <div>
                              <span className="text-xs font-bold text-slate-300 block mb-1.5 uppercase tracking-wider">
                                📖 {currentLang === 'vi' ? 'Thông tin chi tiết về lễ hội & nhạc cụ dân gian:' : currentLang === 'ko' ? '축제 일정, 춤 & 민속 악기 상세:' : 'Living Festivals & Folk Instruments:'}
                              </span>
                              <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-line bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                                {modalDisplayFestival}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Cultural Highlight story */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/90 border border-slate-800 text-xs sm:text-sm">
                    <span className="font-bold text-amber-400 block mb-1.5 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-amber-400" />
                      {currentLang === 'vi'
                        ? 'Bản sắc văn hóa & Tín ngưỡng dân gian:'
                        : currentLang === 'ko'
                        ? '문화적 정체성 & 민간 신앙:'
                        : 'Cultural Identity & Folk Beliefs:'}
                    </span>
                    <p className="text-slate-300 leading-relaxed">{modalDisplayHighlight}</p>
                  </div>

                  {/* Residence & Population Footer */}
                  <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
                    <p>
                      📍 <strong>{currentLang === 'vi' ? 'Địa bàn cư trú chính:' : currentLang === 'ko' ? '주요 거주 지역:' : 'Residence:'}</strong>{' '}
                      <span className="text-slate-200">{modalDisplayResidence}</span>
                    </p>
                    <p>
                      👥 <strong>{currentLang === 'vi' ? 'Dân số ước tính:' : currentLang === 'ko' ? '추정 인구:' : 'Population:'}</strong>{' '}
                      <span className="text-amber-300 font-semibold">{zoomedEthnicImage.populationEstimate}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Fullscreen Photo Lightbox Modal */}
        {zoomedPhoto && (
          <div
            className="fixed inset-0 z-60 bg-black/92 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
            onClick={() => setZoomedPhoto(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/10] sm:aspect-[16/9] max-h-[75vh] bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={zoomedPhoto.url}
                  alt={zoomedPhoto.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
                <button
                  onClick={() => setZoomedPhoto(null)}
                  className="absolute top-3 right-3 p-2.5 rounded-full bg-black/70 hover:bg-amber-500 hover:text-slate-950 text-white transition-all cursor-pointer shadow-lg z-10"
                  title="Đóng (Close)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4 sm:p-5 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-white">
                <div>
                  <h4 className="text-base sm:text-lg font-black text-amber-300">{zoomedPhoto.title}</h4>
                  {zoomedPhoto.subtitle && (
                    <p className="text-xs text-slate-300 mt-0.5">{zoomedPhoto.subtitle}</p>
                  )}
                </div>
                <button
                  onClick={() => setZoomedPhoto(null)}
                  className="self-end sm:self-auto px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold transition-colors cursor-pointer border border-slate-700 text-slate-200 hover:text-white"
                >
                  {currentLang === 'vi' ? 'Đóng ảnh' : currentLang === 'ko' ? '닫기' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
