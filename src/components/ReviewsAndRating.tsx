import React, { useState } from 'react';
import {
  Star,
  MessageSquare,
  CheckCircle,
  ThumbsUp,
  Send,
  User,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { REVIEWS } from '../data/travelData';
import { ReviewItem, Language } from '../types';

interface ReviewsAndRatingProps {
  currentLang: Language;
}

export const ReviewsAndRating: React.FC<ReviewsAndRatingProps> = ({ currentLang }) => {
  const [reviews, setReviews] = useState<ReviewItem[]>(REVIEWS);
  const [newRating, setNewRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [authorName, setAuthorName] = useState('');
  const [nationality, setNationality] = useState('');
  const [visitedDestination, setVisitedDestination] = useState('');
  const [comment, setComment] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  // Compute stats
  const totalReviews = reviews.length;
  const avgRating = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / (totalReviews || 1)
  ).toFixed(1);

  const starCounts = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => r.rating === star).length;
    const percentage = Math.round((count / (totalReviews || 1)) * 100);
    return { star, count, percentage };
  });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !comment.trim()) return;

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: authorName.trim(),
      country: nationality.trim() || (currentLang === 'vi' ? 'Việt Nam' : 'International'),
      rating: newRating,
      date: new Date().toLocaleDateString('vi-VN'),
      comment: comment.trim(),
      destination: visitedDestination.trim() || 'Việt Nam',
      userType: currentLang === 'vi' ? 'Trong nước' : 'Quốc tế',
    };

    setReviews([newRev, ...reviews]);
    setAuthorName('');
    setNationality('');
    setVisitedDestination('');
    setComment('');
    setSubmittedMessage(true);
    setTimeout(() => setSubmittedMessage(false), 4000);
  };

  return (
    <section id="reviews" className="py-14 sm:py-20 bg-sky-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Star className="w-3.5 h-3.5 fill-current text-amber-600" />
            <span>
              {currentLang === 'vi'
                ? 'Đánh Giá Từ Du Khách Toàn Cầu'
                : currentLang === 'ko'
                ? '전 세계 여행자 실제 평가'
                : '1 - 5 Star Traveler Reviews'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {currentLang === 'vi'
              ? 'Trải Nghiệm Thực Tế & Đánh Giá 1 - 5 Sao'
              : currentLang === 'ko'
              ? '생생한 여행 경험담 & 1~5성 실시간 평점'
              : 'Authentic Experiences & Star Ratings'}
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            {currentLang === 'vi'
              ? 'Lắng nghe cảm nhận chân thực từ những du khách trong nước và quốc tế đã trải nghiệm du lịch, ẩm thực và dịch vụ tại Việt Nam.'
              : currentLang === 'ko'
              ? '베트남의 자연, 전통 미식, 54개 민족 문화와 여행 서비스를 직접 경험한 국내외 여행자들의 진솔한 후기를 확인하세요.'
              : 'Read verified testimonials from travelers around the globe who experienced the warmth and wonder of Vietnam.'}
          </p>
        </div>

        {/* Rating Overview Dashboard */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-xs mb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left: Overall score */}
            <div className="md:col-span-4 text-center md:border-r md:border-sky-100 md:pr-6">
              <span className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tight">
                {avgRating}
              </span>
              <div className="flex justify-center items-center gap-1 my-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-5 h-5 ${
                      s <= Math.round(Number(avgRating))
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-200'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {currentLang === 'vi'
                  ? `Dựa trên ${totalReviews} lượt đánh giá thực tế`
                  : currentLang === 'ko'
                  ? `${totalReviews}개의 인증된 실제 여행자 리뷰 기반`
                  : `Based on ${totalReviews} verified traveler ratings`}
              </p>
              <div className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>
                  {currentLang === 'vi'
                    ? '98% du khách sẵn sàng quay lại Việt Nam'
                    : currentLang === 'ko'
                    ? '여행자의 98%가 베트남 재방문 의사를 밝혔습니다'
                    : '98% of travelers eager to return to Vietnam'}
                </span>
              </div>
            </div>

            {/* Right: Star breakdown bars */}
            <div className="md:col-span-8 space-y-2">
              {starCounts.map(({ star, count, percentage }) => (
                <div key={star} className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1 w-16 text-slate-600 font-bold shrink-0">
                    <span>{star}</span>
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  </div>
                  <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="w-12 text-right text-slate-500 text-[11px] font-semibold shrink-0">
                    {percentage}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews List & Write Review Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Reviews List (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-sky-600" />
              <span>{currentLang === 'vi' ? 'Nhận Xét Mới Nhất' : currentLang === 'ko' ? '최신 여행자 리뷰' : 'Latest Traveler Reviews'}</span>
            </h3>

            <div className="space-y-4">
              {reviews.map((rev) => {
                const koComments: Record<string, string> = {
                  'rev-1': 'VIETNAM’S TRAVEL 앱은 정말 훌륭합니다! 크루즈 갑판 위에서 음성 지도 기능으로 하롱베이의 전설을 생생하게 들을 수 있었어요. 회화 사전의 정확한 발음 덕분에 안 매운 쌀국수도 쉽게 주문했습니다. 베트남은 정말 아름답고 친절한 나라입니다!',
                  'rev-2': '베트남의 문화와 정성을 담은 완벽한 여행 앱입니다! 54개 소수민족의 고유 의상과 건축 양식 해설이 매우 깊이 있고, 5일간의 서북부 맞춤 일정 덕분에 경비를 크게 아낄 수 있었습니다.',
                  'rev-3': '호이안은 마법 같았습니다! 일본 다리를 통해 베트남과 일본의 역사적 교류를 이해할 수 있었고, 현지 물가 가이드 덕분에 바가지요금 없이 안심하고 여행했습니다. 베트남을 찾는 모든 해외 여행객에게 추천합니다!',
                  'rev-4': '깔끔한 파스텔 톤 디자인으로 부모님도 쉽게 사용하셨어요. 여행 유형별 안내와 예상 경비가 명확해서 가족과 함께 푸꾸옥 여행을 알차게 다녀왔습니다.',
                };

                const commentText = currentLang === 'ko' && koComments[rev.id] ? koComments[rev.id] : rev.comment;
                const userBadge = currentLang === 'ko' ? (rev.userType === 'Trong nước' ? '국내 여행자' : '해외 여행자') : rev.userType;

                return (
                  <div
                    key={rev.id}
                    className="bg-white rounded-2xl p-5 border border-sky-100 shadow-xs hover:border-sky-200 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs border border-sky-200">
                          {rev.author.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-slate-900 leading-tight">
                              {rev.author}
                            </h4>
                            <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-sky-50 text-sky-700 font-semibold border border-sky-100">
                              {userBadge}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                            <span>{rev.country}</span>
                            <span>•</span>
                            <span className="flex items-center gap-0.5 text-sky-600">
                              <MapPin className="w-3 h-3" />
                              {rev.destination}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center gap-0.5 justify-end">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`w-3.5 h-3.5 ${
                                s <= rev.rating
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-slate-200'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] text-slate-400 mt-0.5 block">
                          {rev.date}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      "{commentText}"
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Write Review Form (Right 5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-sky-100 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-600" />
              <span>{currentLang === 'vi' ? 'Chia Sẻ Đánh Giá Của Bạn' : currentLang === 'ko' ? '나만의 솔직한 여행 후기 작성' : 'Leave Your Review'}</span>
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              {currentLang === 'vi'
                ? 'Đánh giá từ 1 đến 5 sao để cùng xây dựng cộng đồng du lịch Việt Nam văn minh và thân thiện.'
                : currentLang === 'ko'
                ? '1성부터 5성까지 별점과 솔직한 후기를 남겨 다음 여행자들을 위한 스마트한 여행 커뮤니티를 만들어주세요.'
                : 'Rate from 1 to 5 stars to help future travelers discover the finest experiences in Vietnam.'}
            </p>

            {submittedMessage && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200 flex items-center gap-2 animate-in fade-in">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {currentLang === 'vi'
                    ? 'Cảm ơn bạn! Đánh giá của bạn đã được ghi nhận thành công.'
                    : currentLang === 'ko'
                    ? '소중한 후기가 성공적으로 등록되었습니다. 감사합니다!'
                    : 'Thank you! Your review has been successfully submitted.'}
                </span>
              </div>
            )}

            <form onSubmit={handleSubmitReview} className="space-y-4">
              {/* Star Picker */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  {currentLang === 'vi' ? 'Số sao đánh giá (1 - 5 sao):' : currentLang === 'ko' ? '별점 선택 (1 - 5성):' : 'Your Rating (1 - 5 Stars):'}
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      id={`star-btn-${star}`}
                      onClick={() => setNewRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 cursor-pointer transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= (hoverRating || newRating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-200'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-amber-600 ml-2">
                    {newRating === 5
                      ? currentLang === 'vi'
                        ? 'Tuyệt vời (5★)'
                        : currentLang === 'ko'
                        ? '최고예요 (5★)'
                        : 'Exceptional (5★)'
                      : newRating === 4
                      ? currentLang === 'vi'
                        ? 'Rất tốt (4★)'
                        : currentLang === 'ko'
                        ? '매우 좋아요 (4★)'
                        : 'Very Good (4★)'
                      : newRating === 3
                      ? currentLang === 'vi'
                        ? 'Bình thường (3★)'
                        : currentLang === 'ko'
                        ? '보통이에요 (3★)'
                        : 'Average (3★)'
                      : newRating === 2
                      ? currentLang === 'vi'
                        ? 'Tạm được (2★)'
                        : currentLang === 'ko'
                        ? '그저 그래요 (2★)'
                        : 'Fair (2★)'
                      : currentLang === 'vi'
                      ? 'Cần cải thiện (1★)'
                      : currentLang === 'ko'
                      ? '개선이 필요해요 (1★)'
                      : 'Needs Improvement (1★)'}
                  </span>
                </div>
              </div>

              {/* Author name & nationality */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {currentLang === 'vi' ? 'Họ và tên:' : currentLang === 'ko' ? '성명 / 닉네임:' : 'Your Name:'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder={currentLang === 'vi' ? 'VD: Nguyễn Hải Nam' : currentLang === 'ko' ? '예: 김민수' : 'e.g. John Smith'}
                    className="w-full px-3 py-2 rounded-xl border border-sky-100 bg-slate-50 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-sky-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {currentLang === 'vi' ? 'Quốc tịch / Nơi sống:' : currentLang === 'ko' ? '국적 / 거주 도시:' : 'Country / City:'}
                  </label>
                  <input
                    type="text"
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    placeholder={currentLang === 'vi' ? 'Hà Nội, Việt Nam' : currentLang === 'ko' ? '서울, 대한민국' : 'Sydney, Australia'}
                    className="w-full px-3 py-2 rounded-xl border border-sky-100 bg-slate-50 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-sky-400"
                  />
                </div>
              </div>

              {/* Visited Destination */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {currentLang === 'vi' ? 'Địa danh bạn đã ghé thăm:' : currentLang === 'ko' ? '방문하신 여행지:' : 'Destination Visited:'}
                </label>
                <input
                  type="text"
                  value={visitedDestination}
                  onChange={(e) => setVisitedDestination(e.target.value)}
                  placeholder={currentLang === 'vi' ? 'Hạ Long, Hội An, Sapa...' : currentLang === 'ko' ? '하롱베이, 호이안, 사파...' : 'Ha Long, Hoi An, Sapa...'}
                  className="w-full px-3 py-2 rounded-xl border border-sky-100 bg-slate-50 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-sky-400"
                />
              </div>

              {/* Comment text */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {currentLang === 'vi' ? 'Nội dung nhận xét:' : currentLang === 'ko' ? '상세 후기 내용:' : 'Your Review Comment:'} *
                </label>
                <textarea
                  rows={4}
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={
                    currentLang === 'vi'
                      ? 'Chia sẻ cảm nhận về con người, cảnh đẹp, đồ ăn ngon và chi phí trải nghiệm...'
                      : currentLang === 'ko'
                      ? '베트남 사람들의 친절함, 풍경, 미식, 물가 및 전반적인 여행 소감을 자유롭게 들려주세요...'
                      : 'Share your impressions about the hospitality, sceneries, food, and pricing...'
                  }
                  className="w-full p-3 rounded-xl border border-sky-100 bg-slate-50 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-sky-400"
                />
              </div>

              <button
                type="submit"
                id="submit-review-btn"
                className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md shadow-sky-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{currentLang === 'vi' ? 'Gửi Đánh Giá Của Bạn' : currentLang === 'ko' ? '리뷰 등록하기' : 'Submit Review'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
