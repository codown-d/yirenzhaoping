"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BannerSlide {
  id: number
  title: string
  subtitle: string
  description: string
  image: string
  buttonText?: string
  buttonLink?: string
  backgroundColor?: string
}

interface CarouselBannerProps {
  slides: BannerSlide[]
  autoPlay?: boolean
  autoPlayInterval?: number
  showDots?: boolean
  showArrows?: boolean
  height?: string
}

export function CarouselBanner({
  slides,
  autoPlay = true,
  autoPlayInterval = 5000,
  showDots = true,
  showArrows = true,
  height = "200px"
}: CarouselBannerProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  // 自动播放
  useEffect(() => {
    if (!autoPlay || slides.length <= 1) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, slides.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  if (slides.length === 0) return null

  return (
    <div className="relative w-full overflow-hidden rounded-2xl shadow-sm" style={{ height }}>
      {/* 轮播内容 */}
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="w-full flex-shrink-0 relative h-full"
            style={{ 
              background: slide.backgroundColor || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }}
          >
            {/* 背景图片 */}
            {slide.image && (
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
            )}
            
            {/* 内容 */}
            <div className="relative h-full flex items-center justify-between p-6 text-white">
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-2">{slide.title}</h2>
                <p className="text-sm opacity-90 mb-1">{slide.subtitle}</p>
                <p className="text-xs opacity-75 mb-4">{slide.description}</p>
                {slide.buttonText && (
                  <Button 
                    size="sm" 
                    variant="secondary"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                  >
                    {slide.buttonText}
                  </Button>
                )}
              </div>
              
              {/* 装饰图标或图片 */}
              <div className="flex-shrink-0 ml-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🎭</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 左右箭头 */}
      {showArrows && slides.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="sm"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-2 h-8 w-8"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-2 h-8 w-8"
            onClick={goToNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}

      {/* 指示点 */}
      {showDots && slides.length > 1 && (
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
