import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BookText,
  Users,
  Sparkles,
  LayoutDashboard,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";
import Image from "next/image";

export default function HomePage() {
  return (
    <main>
      <section className="py-20 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl md:text-6xl">
                专业OH卡咨询工具
                <span className="block text-green-600">助力心理咨询师</span>
              </h1>
              <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                数字化OH卡全套解决方案，整合22种卡组、AI生成卡片和客户管理系统，让您的咨询工作更高效、更有深度。
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0 flex flex-col sm:flex-row gap-4">
                <a href="#contact">
                  <Button
                    size="lg"
                    className="text-lg rounded-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    免费咨询
                    <MessageCircle className="ml-2 h-5 w-5" />
                  </Button>
                </a>
                <a href="#features">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg rounded-full border-green-600 text-green-600 hover:bg-green-50"
                  >
                    查看功能
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <Image
                src="https://p8.itc.cn/images01/20220118/18b5d12c4c244d40a9fb7722e3376302.jpeg"
                alt="Terminal"
                width={800}
                height={400}
                priority
                className="w-full h-40 object-cover rounded-md"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-16 bg-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            专为心理咨询师打造的核心功能
          </h2>
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div>
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-600 text-white">
                <Users className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium text-gray-900">
                  客户管理系统
                </h2>
                <p className="mt-2 text-base text-gray-600">
                  完整记录客户咨询历程，自动生成会话报告，轻松追踪每个客户的心理成长轨迹。
                </p>
              </div>
            </div>

            <div className="mt-10 lg:mt-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-600 text-white">
                <Sparkles className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium text-gray-900">
                  全套OH卡数字版
                </h2>
                <p className="mt-2 text-base text-gray-600">
                  包含基础OH卡、伴侣卡、人像卡等22种卡组，支持自定义分类（创伤疗愈/伴侣关系等）。
                </p>
              </div>
            </div>

            <div className="mt-10 lg:mt-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-600 text-white">
                <LayoutDashboard className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium text-gray-900">
                  智能卡片生成
                </h2>
                <p className="mt-2 text-base text-gray-600">
                  版权安全的AI图像生成，根据关键词自动创建治疗用卡片，规避侵权风险。
                </p>
              </div>
            </div>
          </div>

          <div className="lg:grid lg:grid-cols-3 lg:gap-8 mt-12">
            <div>
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-600 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  />
                </svg>
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium text-gray-900">
                  动态提示词引擎
                </h2>
                <p className="mt-2 text-base text-gray-600">
                  输入"压力"等关键词，自动生成隐喻图像，为不同心理状态定制专属卡片。
                </p>
              </div>
            </div>

            <div className="mt-10 lg:mt-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-600 text-white">
                <BookText className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium text-gray-900">
                  深度分析报告
                </h2>
                <p className="mt-2 text-base text-gray-600">
                  自动分析客户选卡模式，生成专业解析报告，帮助您发现潜在心理线索。
                </p>
              </div>
            </div>

            <div className="mt-10 lg:mt-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-600 text-white">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium text-gray-900">
                  数据安全保障
                </h2>
                <p className="mt-2 text-base text-gray-600">
                  严格遵循心理咨询保密原则，银行级数据加密，保障客户隐私安全。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                为什么选择数字OH卡？
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-600">
                传统OH卡存在诸多限制 -
                卡片丢失、种类有限、无法记录咨询过程。我们的数字解决方案在保留OH卡精髓的同时，为心理咨询带来全新可能。
              </p>
              <ul className="mt-6 space-y-4 text-gray-600">
                <li className="flex items-start">
                  <svg
                    className="h-6 w-6 flex-shrink-0 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="ml-3">再也不用担心卡片损坏或丢失</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-6 w-6 flex-shrink-0 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="ml-3">为特殊治疗需求创建专属卡片</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-6 w-6 flex-shrink-0 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="ml-3">完整记录每次咨询过程，随时回溯</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-6 w-6 flex-shrink-0 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="ml-3">线上线下咨询无缝切换</span>
                </li>
              </ul>
            </div>
            <div className="mt-8 lg:mt-0">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-medium text-green-700">用户评价</h3>
                <blockquote className="mt-4 text-gray-600">
                  <p>
                    "这个平台彻底改变了我的OH卡咨询方式。AI生成的卡片特别适合中国来访者的文化背景，而且自动记录功能让我的工作效率提高了至少50%。"
                  </p>
                </blockquote>
                <div className="mt-4 flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <span className="font-medium">王</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      王心理咨询师
                    </p>
                    <p className="text-sm text-gray-500">
                      资深心理咨询师，从业10年
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              立即体验数字OH卡
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-600">
              扫描下方二维码添加微信咨询，或直接联系：chm362321
            </p>
          </div>

          <div className="mt-12 flex flex-col md:flex-row justify-center items-center gap-12">
            <div className="text-center">
              <div className="mx-auto bg-white p-4 rounded-lg shadow-md inline-block">
                {/* 这里替换为你的实际二维码图片 */}
                <div className="w-48 h-48 bg-gray-100 flex items-center justify-center text-gray-400">
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
                    alt="QR Code"
                    width={100}
                    height={100}
                  />
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-500">扫码添加微信咨询</p>
            </div>

            <div className="hidden md:block border-l border-gray-200 h-40"></div>

            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mx-auto">
                <MessageCircle className="h-8 w-8" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                直接联系
              </h3>
              <p className="mt-2 text-base text-gray-600">
                微信号: <span className="font-mono">chm362321</span>
              </p>
              <p className="mt-1 text-sm text-gray-500">工作日9:00-18:00在线</p>
            </div>
          </div>

          <div className="mt-12 max-w-md mx-auto">
            <p className="text-center text-sm text-gray-500">
              或留下您的联系方式，我们会尽快与您联系
            </p>
            <form className="mt-6 space-y-4">
              <div>
                <label htmlFor="name" className="sr-only">
                  姓名
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="您的姓名"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  联系方式
                </label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  required
                  placeholder="微信号或手机号"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white rounded-md"
                >
                  提交信息
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
