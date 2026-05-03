import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, TrendingUp, Users, Target, DollarSign, Calendar, MessageSquare, CheckCircle, Zap } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const revenueData = [
    { stage: 'المرحلة 0\n(20-100)', costs: 77, revenue: 0, profit: -77 },
    { stage: 'المرحلة 2\n(100-1K)', costs: 1154, revenue: 2475, profit: 1321 },
    { stage: 'المرحلة 3\n(1K-10K)', costs: 12326, revenue: 24750, profit: 12424 },
  ];

  const costBreakdown = [
    { name: 'Supabase', value: 2796, color: '#60A5FA' },
    { name: 'OpenAI API', value: 4665, color: '#93C5FD' },
    { name: 'WhatsApp API', value: 2860, color: '#DBEAFE' },
    { name: 'التسويق', value: 1300, color: '#3B82F6' },
    { name: 'أخرى', value: 705, color: '#BFDBFE' },
  ];

  const growthData = [
    { month: 'الشهر 1', users: 100 },
    { month: 'الشهر 2', users: 250 },
    { month: 'الشهر 3', users: 500 },
    { month: 'الشهر 4', users: 1000 },
    { month: 'الشهر 5', users: 2500 },
    { month: 'الشهر 6', users: 5000 },
  ];

  const marketingStrategies = [
    { name: 'أول 100 مجاناً', impact: 95, icon: '🎁' },
    { name: 'Word of Mouth', impact: 85, icon: '💬' },
    { name: 'واتساب الطلاب', impact: 90, icon: '📱' },
    { name: 'تيليجرام', impact: 75, icon: '✈️' },
  ];

  const slides = [
    // Slide 1: Title
    <div className="flex flex-col items-center justify-center h-full text-center px-16" dir="rtl">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="mb-8"
      >
        <div className="text-8xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-4">
          ARO
        </div>
        <div className="text-3xl text-gray-700 font-light">
          مساعدك الأكاديمي الذكي
        </div>
      </motion.div>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-xl text-gray-600 max-w-2xl"
      >
        حل ذكي يربط بين أنظمة إدارة التعلم وواتساب لتنظيم حياتك الدراسية
      </motion.div>
    </div>,

    // Slide 2: Problem
    <div className="flex flex-col justify-center h-full px-20 py-12" dir="rtl">
      <motion.h2
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="text-5xl font-bold text-gray-800 mb-12"
      >
        المشكلة 🤔
      </motion.h2>
      <div className="grid grid-cols-2 gap-8">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-8 shadow-xl border border-blue-100"
        >
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">تصفح متعدد للصفحات</h3>
          <p className="text-gray-600 leading-relaxed text-lg">
            الطلاب يضطرون لتصفح صفحات متعددة في أنظمة LMS لمعرفة مهامهم
          </p>
        </motion.div>

        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl p-8 shadow-xl border border-blue-100"
        >
          <div className="text-6xl mb-4">🔕</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">تنبيهات غير فعالة</h3>
          <p className="text-gray-600 leading-relaxed text-lg">
            لا توجد تنبيهات ذكية للمواعيد النهائية المضافة في اللحظة الأخيرة
          </p>
        </motion.div>

        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-3xl p-8 shadow-xl border border-blue-100"
        >
          <div className="text-6xl mb-4">⏰</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">مواعيد فائتة</h3>
          <p className="text-gray-600 leading-relaxed text-lg">
            الطلاب يفوتون التسليمات ليس بسبب الإهمال، بل بسبب النظام
          </p>
        </motion.div>

        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-8 shadow-xl border border-red-200"
        >
          <div className="text-6xl mb-4">📉</div>
          <h3 className="text-2xl font-bold text-red-600 mb-4">النتيجة</h3>
          <p className="text-gray-700 leading-relaxed text-lg font-semibold">
            تأثير سلبي على الدرجات والأداء الأكاديمي
          </p>
        </motion.div>
      </div>
    </div>,

    // Slide 3: Solution
    <div className="flex flex-col justify-center h-full px-20 py-12" dir="rtl">
      <motion.h2
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="text-5xl font-bold text-gray-800 mb-12"
      >
        الحل ✨
      </motion.h2>
      <div className="grid grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 text-center shadow-lg"
        >
          <MessageSquare className="w-16 h-16 mx-auto mb-4 text-blue-600" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">واتساب</h3>
          <p className="text-gray-600">التطبيق الذي تستخدمه يومياً</p>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-8 text-center shadow-lg"
        >
          <Zap className="w-16 h-16 mx-auto mb-4 text-green-600" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">تلقائي</h3>
          <p className="text-gray-600">سحب تلقائي من LMS</p>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-8 text-center shadow-lg"
        >
          <Target className="w-16 h-16 mx-auto mb-4 text-purple-600" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">ذكي</h3>
          <p className="text-gray-600">خطط دراسة مخصصة</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="bg-white rounded-3xl p-10 shadow-2xl border-2 border-blue-200"
      >
        <h3 className="text-3xl font-bold text-blue-600 mb-6 text-center">ARO - المساعد الأكاديمي الذكي</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0 mt-1" />
            <p className="text-gray-700 text-lg">سحب تلقائي للمواعيد النهائية والجداول من LMS</p>
          </div>
          <div className="flex items-start gap-4">
            <CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0 mt-1" />
            <p className="text-gray-700 text-lg">تحويل كل موعد إلى خطة دراسة عملية مخصصة</p>
          </div>
          <div className="flex items-start gap-4">
            <CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0 mt-1" />
            <p className="text-gray-700 text-lg">إجابات فورية على أسئلتك الأكاديمية عبر واتساب</p>
          </div>
          <div className="flex items-start gap-4">
            <CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0 mt-1" />
            <p className="text-gray-700 text-lg">بدون تطبيقات جديدة - فقط واتساب!</p>
          </div>
        </div>
      </motion.div>
    </div>,

    // Slide 4: How It Works
    <div className="flex flex-col justify-center h-full px-20 py-12" dir="rtl">
      <motion.h2
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="text-5xl font-bold text-gray-800 mb-12 text-center"
      >
        كيف يعمل ARO؟ ⚙️
      </motion.h2>
      <div className="flex items-center justify-between gap-8">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex-1 bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 shadow-xl"
        >
          <div className="text-6xl mb-4 text-center">🔌</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Chrome Extension</h3>
          <p className="text-gray-700 text-lg text-center leading-relaxed">
            إضافة كروم تسحب بياناتك من LMS تلقائياً
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
          className="text-blue-400 text-6xl"
        >
          →
        </motion.div>

        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex-1 bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-8 shadow-xl"
        >
          <div className="text-6xl mb-4 text-center">🤖</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Python Bot</h3>
          <p className="text-gray-700 text-lg text-center leading-relaxed">
            بوت ذكي يعالج البيانات ويحولها لخطط دراسية
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
          className="text-blue-400 text-6xl"
        >
          →
        </motion.div>

        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex-1 bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-8 shadow-xl"
        >
          <div className="text-6xl mb-4 text-center">💬</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">WhatsApp</h3>
          <p className="text-gray-700 text-lg text-center leading-relaxed">
            تفاعل سهل ومألوف عبر واتساب
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl p-8 text-white text-center shadow-2xl"
      >
        <p className="text-2xl font-bold">
          ما في تطبيق جديد تنزله. ما في login ثاني. فقط WhatsApp! 🚀
        </p>
      </motion.div>
    </div>,

    // Slide 5: Value Proposition
    <div className="flex flex-col justify-center h-full px-20 py-12" dir="rtl">
      <motion.h2
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="text-5xl font-bold text-gray-800 mb-12"
      >
        القيمة المضافة 💎
      </motion.h2>
      <div className="grid grid-cols-2 gap-8">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-red-50 rounded-3xl p-8 shadow-lg border border-red-200"
        >
          <h3 className="text-2xl font-bold text-red-600 mb-6">الحلول التقليدية ❌</h3>
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4">
              <p className="text-gray-700 font-semibold mb-2">Gallabox & Interakt</p>
              <p className="text-gray-600 text-sm">مصممة للجامعات، ليس للطالب مباشرة</p>
            </div>
            <div className="bg-white rounded-xl p-4">
              <p className="text-gray-700 font-semibold mb-2">RemindMe Bot</p>
              <p className="text-gray-600 text-sm">تعتمد على الإدخال اليدوي الكامل</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-8 shadow-xl border-2 border-green-300"
        >
          <h3 className="text-2xl font-bold text-green-600 mb-6">ARO المتميزة ✅</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <p className="text-gray-700 font-semibold">سحب تلقائي من LMS - صفر إدخال يدوي</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <p className="text-gray-700 font-semibold">خطط دراسة ذكية ومخصصة</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <p className="text-gray-700 font-semibold">واجهة مألوفة عبر واتساب</p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white text-center shadow-2xl"
      >
        <p className="text-3xl font-bold mb-2">الحل الوحيد الذي يجمع الثلاثة معاً! 🎯</p>
        <p className="text-xl opacity-90">سحب تلقائي + خطط ذكية + واتساب</p>
      </motion.div>
    </div>,

    // Slide 6: Target Customers
    <div className="flex flex-col justify-center h-full px-20 py-12" dir="rtl">
      <motion.h2
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="text-5xl font-bold text-gray-800 mb-12"
      >
        شريحة العملاء 🎓
      </motion.h2>

      <div className="grid grid-cols-2 gap-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-blue-600 mb-6">مسار النمو 📈</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={growthData}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '2px solid #3B82F6',
                  borderRadius: '12px',
                  direction: 'rtl'
                }}
              />
              <Area type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-6 shadow-lg">
            <Users className="w-12 h-12 text-blue-600 mb-3" />
            <h4 className="text-xl font-bold text-gray-800 mb-2">المرحلة الأولى</h4>
            <p className="text-gray-700 mb-1">20 طالب في جامعة UTeM</p>
            <p className="text-3xl font-bold text-blue-600">→ 12,000 طالب</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-6 shadow-lg">
            <Target className="w-12 h-12 text-green-600 mb-3" />
            <h4 className="text-xl font-bold text-gray-800 mb-2">التوسع الإقليمي</h4>
            <p className="text-gray-700">مالاكا → كوالا → جوهور → بقية ماليزيا</p>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl p-6 shadow-2xl text-white">
            <TrendingUp className="w-12 h-12 mb-3" />
            <h4 className="text-xl font-bold mb-2">السوق الإجمالي</h4>
            <p className="text-4xl font-bold">1.2M - 1.3M</p>
            <p className="text-lg opacity-90">طالب في ماليزيا</p>
          </div>
        </motion.div>
      </div>
    </div>,

    // Slide 7: Marketing Plan
    <div className="flex flex-col justify-center h-full px-20 py-12" dir="rtl">
      <motion.h2
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="text-5xl font-bold text-gray-800 mb-12"
      >
        خطة التسويق 📢
      </motion.h2>

      <div className="grid grid-cols-2 gap-8 mb-8">
        {marketingStrategies.map((strategy, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="bg-white rounded-3xl p-6 shadow-xl border-2 border-blue-100"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="text-5xl">{strategy.icon}</div>
              <h3 className="text-2xl font-bold text-gray-800">{strategy.name}</h3>
            </div>
            <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${strategy.impact}%` }}
                transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                className="absolute h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
              />
            </div>
            <p className="text-right text-blue-600 font-bold mt-2">{strategy.impact}% تأثير</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="grid grid-cols-2 gap-6"
      >
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-6 shadow-lg border border-green-200">
          <h4 className="text-xl font-bold text-green-700 mb-3">🎁 استراتيجية البداية</h4>
          <p className="text-gray-700 text-lg">أول 100 مستخدم مجاناً بالكامل</p>
          <p className="text-gray-600 mt-2">بعدها: تجربة مجانية لمدة أسبوعين</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-6 shadow-lg border border-purple-200">
          <h4 className="text-xl font-bold text-purple-700 mb-3">💬 التسويق العضوي</h4>
          <p className="text-gray-700 text-lg">Word of Mouth + مجموعات الطلاب</p>
          <p className="text-gray-600 mt-2">واتساب + تيليجرام = صفر تكلفة إعلانية</p>
        </div>
      </motion.div>
    </div>,

    // Slide 8: Pricing
    <div className="flex flex-col justify-center h-full px-20 py-12" dir="rtl">
      <motion.h2
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="text-5xl font-bold text-gray-800 mb-12 text-center"
      >
        خطة الأسعار 💳
      </motion.h2>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring" }}
        className="max-w-2xl mx-auto"
      >
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl p-10 shadow-2xl text-white border-4 border-blue-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-yellow-400 text-blue-900 px-6 py-2 rounded-bl-3xl font-bold text-lg">
            ⭐ PRO
          </div>

          <div className="text-center mb-8 mt-4">
            <h3 className="text-4xl font-bold mb-4">خطة Pro</h3>
            <div className="flex items-center justify-center gap-2">
              <div className="text-6xl font-bold">RM9</div>
              <div className="text-2xl opacity-80">/ شهر</div>
            </div>
            <p className="text-xl mt-2 opacity-90">للطالب الجاد اللي يبغى كل شيء</p>
          </div>

          <div className="space-y-4">
            {[
              'جميع المواعيد النهائية بدون حد',
              'الجدول الدراسي الكامل: اليوم، الغد، الأسبوع',
              'جميع أوامر WhatsApp: today, tomorrow, week, overdue',
              'تنبيهات مخصصة: 24 ساعة + 3 ساعات + وقت مخصص',
              'مزامنة تلقائية كل 30 دقيقة',
              'مساعد AI للإجابة على أسئلتك',
              'دعم بأولوية عبر WhatsApp'
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-3 bg-white bg-opacity-20 rounded-xl p-3 backdrop-blur-sm"
              >
                <CheckCircle className="w-6 h-6 flex-shrink-0" />
                <span className="text-lg">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>,

    // Slide 9: Revenue & Costs
    <div className="flex flex-col justify-center h-full px-20 py-12" dir="rtl">
      <motion.h2
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="text-5xl font-bold text-gray-800 mb-8"
      >
        المصاريف والإيرادات 💰
      </motion.h2>

      <div className="grid grid-cols-2 gap-8">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-blue-600 mb-4 text-center">مقارنة المراحل</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="stage" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '2px solid #3B82F6',
                  borderRadius: '12px',
                  direction: 'rtl'
                }}
              />
              <Legend wrapperStyle={{ direction: 'rtl' }} />
              <Bar dataKey="costs" fill="#EF4444" name="التكاليف" radius={[8, 8, 0, 0]} />
              <Bar dataKey="revenue" fill="#10B981" name="الإيرادات" radius={[8, 8, 0, 0]} />
              <Bar dataKey="profit" fill="#3B82F6" name="الربح" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-purple-600 mb-4 text-center">توزيع التكاليف (المرحلة 3)</h3>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={costBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {costBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '2px solid #8B5CF6',
                  borderRadius: '12px',
                  direction: 'rtl'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <div className="grid grid-cols-3 gap-6 mt-8">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 text-center shadow-lg border border-red-200"
        >
          <DollarSign className="w-12 h-12 mx-auto mb-2 text-red-600" />
          <h4 className="font-bold text-gray-700 mb-1">المرحلة 0</h4>
          <p className="text-3xl font-bold text-red-600">-RM77</p>
          <p className="text-sm text-gray-600 mt-1">20-100 مستخدم</p>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6 text-center shadow-lg border border-yellow-200"
        >
          <TrendingUp className="w-12 h-12 mx-auto mb-2 text-yellow-600" />
          <h4 className="font-bold text-gray-700 mb-1">المرحلة 2</h4>
          <p className="text-3xl font-bold text-green-600">+RM1,321</p>
          <p className="text-sm text-gray-600 mt-1">100-1K مستخدم</p>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 text-center shadow-lg border-2 border-green-300"
        >
          <TrendingUp className="w-12 h-12 mx-auto mb-2 text-green-600" />
          <h4 className="font-bold text-gray-700 mb-1">المرحلة 3</h4>
          <p className="text-3xl font-bold text-green-600">+RM12,424</p>
          <p className="text-sm text-gray-600 mt-1">1K-10K مستخدم</p>
        </motion.div>
      </div>
    </div>,

    // Slide 10: Final Call to Action
    <div className="flex flex-col items-center justify-center h-full text-center px-16" dir="rtl">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="mb-8"
      >
        <div className="text-8xl mb-6">🚀</div>
        <h2 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
          هل أنت مستعد؟
        </h2>
      </motion.div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-6 max-w-3xl"
      >
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-3xl p-8 text-white shadow-2xl">
          <p className="text-3xl font-bold mb-4">ARO - مساعدك الأكاديمي الذكي</p>
          <p className="text-xl opacity-90">نظّم حياتك الدراسية بذكاء عبر واتساب</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-300">
            <div className="text-4xl mb-2">✅</div>
            <p className="font-bold text-gray-800">تلقائي 100%</p>
          </div>
          <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-300">
            <div className="text-4xl mb-2">🎯</div>
            <p className="font-bold text-gray-800">ذكي ومخصص</p>
          </div>
          <div className="bg-purple-50 rounded-2xl p-6 border-2 border-purple-300">
            <div className="text-4xl mb-2">💬</div>
            <p className="font-bold text-gray-800">عبر واتساب</p>
          </div>
        </div>

        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, repeat: Infinity, repeatType: "reverse", duration: 1 }}
          className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl p-6 shadow-xl"
        >
          <p className="text-2xl font-bold text-gray-900">
            ابدأ الآن - أول 100 مستخدم مجاناً! 🎁
          </p>
        </motion.div>
      </motion.div>
    </div>,
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="size-full bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      {/* Slide Container */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="h-full"
          >
            {slides[currentSlide]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between px-12 py-6 bg-white bg-opacity-80 backdrop-blur-sm border-t border-blue-100">
        <button
          onClick={prevSlide}
          className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl"
        >
          <ChevronRight className="w-5 h-5" />
          <span className="font-semibold">السابق</span>
        </button>

        <div className="flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-blue-600 w-12'
                  : 'bg-blue-200 hover:bg-blue-300'
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl"
        >
          <span className="font-semibold">التالي</span>
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}