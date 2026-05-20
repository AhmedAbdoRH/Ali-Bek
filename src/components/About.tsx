import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Sparkles } from 'lucide-react';

export default function About() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Subtle Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-50 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-50 rounded-full blur-3xl opacity-50"></div>
      
      <motion.div
        className="container mx-auto px-4 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Left Side - Hero Card */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative group">
              {/* Glow Effect on Hover */}
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-yellow-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition duration-500"></div>
              
              {/* Main Card */}
              <div className="relative bg-gradient-to-br from-red-500 via-red-600 to-red-700 p-10 rounded-3xl shadow-2xl">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/20 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                
                <div className="relative z-10">
                  {/* Badge */}
                  <motion.div 
                    className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-5 py-3 rounded-full mb-6 border border-white/30"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="bg-yellow-400 p-2 rounded-full">
                      <Award className="w-6 h-6 text-red-600" />
                    </div>
                    <span className="text-white font-bold text-lg">20+ عاماً</span>
                  </motion.div>
                  
                  {/* Main Text */}
                  <h3 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
                    عشرون عاماً من الخبرة..
                  </h3>
                  
                  <p className="text-3xl md:text-4xl font-black text-yellow-300 mb-8">
                    نصنع ثقة فريقك
                  </p>
                  
                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mb-6"></div>
                  
                  {/* Subtitle */}
                  <p className="text-white/95 text-lg leading-relaxed">
                    الشريك الاستراتيجي لأكبر الشركات في السوق المصري
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Feature Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-10">
              <h3 className="text-4xl font-black text-gray-900 mb-3 flex items-center gap-4">
                <span className="w-2 h-12 bg-gradient-to-b from-red-500 to-yellow-500 rounded-full"></span>
                لماذا نحن؟
              </h3>
              <div className="h-1 w-24 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full"></div>
            </div>
            
            <div className="space-y-6">
              {/* Card 1 */}
              <motion.div
                className="group relative bg-white p-7 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-red-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03, y: -5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex gap-5">
                  <div className="flex-shrink-0">
                    <motion.div 
                      className="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-red-500 to-red-600 shadow-lg group-hover:shadow-red-500/50 transition-shadow"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Sparkles className="w-7 h-7 text-white" />
                    </motion.div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-sm mb-3 uppercase tracking-wide">خاماتنا</h4>
                    <p className="text-gray-700 text-lg leading-relaxed font-medium">أجود أنواع الأقمشة وأكثرها تنوعاً لتناسب كافة بيئات العمل</p>
                  </div>
                </div>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                className="group relative bg-white p-7 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-yellow-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03, y: -5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex gap-5">
                  <div className="flex-shrink-0">
                    <motion.div 
                      className="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-600 shadow-lg group-hover:shadow-yellow-500/50 transition-shadow"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Award className="w-7 h-7 text-white" />
                    </motion.div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-sm mb-3 uppercase tracking-wide">رؤيتنا</h4>
                    <p className="text-gray-700 text-lg leading-relaxed font-medium">مظهر الفريق هو المرآة التي تعكس احترافية المؤسسة</p>
                  </div>
                </div>
              </motion.div>

              {/* Card 3 */}
              <motion.div
                className="group relative bg-white p-7 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-red-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03, y: -5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex gap-5">
                  <div className="flex-shrink-0">
                    <motion.div 
                      className="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-red-500 to-yellow-500 shadow-lg group-hover:shadow-red-500/50 transition-shadow"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Users className="w-7 h-7 text-white" />
                    </motion.div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-sm mb-3 uppercase tracking-wide">شموليتنا</h4>
                    <p className="text-gray-700 text-lg leading-relaxed font-medium">نلبي احتياجات الشركات والمطاعم والمدارس بأعلى معايير الجودة</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
