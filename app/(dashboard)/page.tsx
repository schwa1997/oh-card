import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BookText,
  Users,
  Sparkles,
  LayoutDashboard,
  ShieldCheck,
  HeartPulse,
  Brain,
  Leaf,
  Star
} from "lucide-react";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl md:text-6xl">
                <span className="block">OH卡专业工作台</span>
                <span className="block text-green-600 mt-3">心理咨询师的智能助手</span>
              </h1>
              <p className="mt-5 text-lg text-gray-600 leading-relaxed">
                整合22种专业卡组、AI辅助分析和全流程客户管理，为心理咨询师提供
                <span className="font-medium text-green-600">高效、深度</span>
                的数字化OH卡解决方案。
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a href="#contact">
                  <Button
                    size="lg"
                    className="text-lg rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-green-200 transition-all"
                  >
                    <HeartPulse className="mr-2 h-5 w-5" />
                    免费体验
                  </Button>
                </a>
                <a href="#features">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg rounded-full border-green-600 text-green-600 hover:bg-green-50 shadow-sm transition-colors"
                  >
                    功能演示
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative w-full h-80 lg:h-96 rounded-2xl overflow-hidden shadow-xl border border-green-100">
                <Image
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvBqnnE1fIH7vo54ZeWJM7kTruZpvvz55UlA&s"
                  alt="OH卡工作台演示"
                  fill
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/10 to-green-50/10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white rounded-t-3xl shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 text-sm font-medium text-green-600 bg-green-50 rounded-full mb-4">
              专业工具套件
            </span>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              专为心理咨询师打造的
              <span className="text-green-600">核心功能</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
              从卡牌管理到深度分析，全方位支持您的咨询工作
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-green-100 text-green-600 mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">客户全周期管理</h3>
              <p className="text-gray-600 leading-relaxed">
                完整记录咨询历程，自动生成可视化报告，追踪每个客户的心理成长轨迹与关键转折点。
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-green-100 text-green-600 mb-4">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">全系列数字卡组</h3>
              <p className="text-gray-600 leading-relaxed">
                包含基础卡、伴侣卡、人像卡等22种专业卡组，支持按创伤疗愈/伴侣关系等自定义分类。
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-green-100 text-green-600 mb-4">
                <LayoutDashboard className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">智能卡片生成</h3>
              <p className="text-gray-600 leading-relaxed">
                基于AI生成版权安全的治疗图像，支持"压力"、"焦虑"等关键词触发动态隐喻图像。
              </p>
            </div>

            {/* Feature Card 4 */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-green-100 text-green-600 mb-4">
                <Brain className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">动态提示引擎</h3>
              <p className="text-gray-600 leading-relaxed">
                智能推荐卡组组合与提问方向，根据咨询进展自动提供专业引导建议。
              </p>
            </div>

            {/* Feature Card 5 */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-green-100 text-green-600 mb-4">
                <BookText className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">深度分析报告</h3>
              <p className="text-gray-600 leading-relaxed">
                自动分析选卡模式与咨询过程，生成包含关键洞察的专业报告，支持PDF导出。
              </p>
            </div>

            {/* Feature Card 6 */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-green-100 text-green-600 mb-4">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">数据安全保障</h3>
              <p className="text-gray-600 leading-relaxed">
                符合心理咨询保密伦理，端到端加密存储，支持多因素认证与权限分级管理。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-green-50 rounded-3xl my-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            <div className="mb-12 lg:mb-0">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-green-100">
                <span className="inline-block px-3 py-1 text-sm font-medium text-green-600 bg-green-50 rounded-full mb-4">
                  数字化优势
                </span>
                <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-6">
                  传统OH卡 vs
                  <span className="text-green-600"> 数字解决方案</span>
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-green-100 p-1 rounded-lg">
                      <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-700 font-medium">完整咨询记录</p>
                      <p className="text-gray-600 mt-1">每次咨询的卡牌布局与对话关键点自动存档，随时回溯</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-green-100 p-1 rounded-lg">
                      <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-700 font-medium">文化适配卡片</p>
                      <p className="text-gray-600 mt-1">AI生成符合中国来访者文化背景的定制图像</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-green-100 p-1 rounded-lg">
                      <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-700 font-medium">混合咨询模式</p>
                      <p className="text-gray-600 mt-1">无缝切换线上线下咨询，客户可远程参与OH卡互动</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-green-100">
                <div className="flex items-center mb-6">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <span className="text-xl font-medium">王</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-medium text-gray-900">王心理咨询师</p>
                    <p className="text-green-600">OH卡疗法资深专家</p>
                  </div>
                </div>
                <blockquote className="relative">
                  <div className="absolute top-0 left-0 transform -translate-x-1 -translate-y-2 text-green-100 text-6xl font-serif">"</div>
                  <p className="relative z-10 text-gray-700 text-lg leading-relaxed pl-6">
                    使用数字OH卡系统后，我的咨询效率提升了40%。特别是AI生成的卡片能精准匹配中国来访者的文化语境，这是传统卡组难以实现的。自动生成的咨询报告也让我能更系统地追踪客户变化。
                  </p>
                  <div className="mt-6 flex items-center">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-500">从业12年，服务800+来访者</span>
                  </div>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-16 bg-white rounded-b-3xl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              开启您的数字化OH卡之旅
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              现在预约演示，获取专属心理咨询师优惠方案
            </p>
          </div>

          <div className="bg-green-50 rounded-2xl p-8 sm:p-10 shadow-inner">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">微信咨询</h3>
                <div className="flex flex-col items-center md:items-start space-y-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm inline-block">
                    <div className="w-40 h-40 bg-white flex items-center justify-center">
                      <Image 
                        // src="/images/wechat-qr.png" 
                        src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
                        alt="微信二维码" 
                        width={160} 
                        height={160}
                        className="rounded"
                      />
                    </div>
                  </div>
                  <p className="text-gray-700">
                    微信号: <span className="font-mono text-green-600">wechat_ohcard</span>
                  </p>
                  <p className="text-sm text-gray-500">添加时请备注"OH卡助手咨询"</p>
                </div>
              </div>

              <div>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="sr-only">姓名</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="w-full px-5 py-3 placeholder-gray-500 focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-lg shadow-sm"
                      placeholder="您的姓名"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="sr-only">电话</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      className="w-full px-5 py-3 placeholder-gray-500 focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-lg shadow-sm"
                      placeholder="联系电话"
                    />
                  </div>
                  <div>
                    <label htmlFor="organization" className="sr-only">机构/工作室</label>
                    <input
                      id="organization"
                      name="organization"
                      type="text"
                      className="w-full px-5 py-3 placeholder-gray-500 focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-lg shadow-sm"
                      placeholder="机构/工作室名称（选填）"
                    />
                  </div>
                  <div>
                    <Button
                      type="submit"
                      className="w-full py-3 px-6 border border-transparent text-lg font-medium rounded-lg shadow-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                    >
                      预约专业演示
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

