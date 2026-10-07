import sys

with open('/src/components/CultureAndHeritage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. New grid card replacement
old_grid_start = '<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">'
old_grid_end = '''                            <button
                              onClick={() => handleInspectEthnic(group)}
                              className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-500 text-amber-900 hover:text-slate-950 transition-all text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer border border-amber-200"
                            >
                              <Eye className="w-3.5 h-3.5 text-amber-700" />
                              <span>
                                {currentLang === 'vi'
                                  ? 'Soi Nét Đặc Trưng'
                                  : currentLang === 'ko'
                                  ? '특징 자세히 보기'
                                  : 'Inspect Features'}
                              </span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>'''

new_grid_content = '''<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
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
                  </div>'''

if old_grid_start not in content:
    print("ERROR: old_grid_start not found")
    sys.exit(1)

start_idx = content.find(old_grid_start)
end_idx = content.find(old_grid_end)
if end_idx == -1:
    print("ERROR: old_grid_end not found")
    sys.exit(1)

end_idx += len(old_grid_end)
content = content[:start_idx] + new_grid_content + content[end_idx:]
print("Grid successfully updated!")

with open('/src/components/CultureAndHeritage.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("File saved successfully.")
