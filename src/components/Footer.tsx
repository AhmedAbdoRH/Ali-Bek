import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Snail as Snapchat, Youtube, Phone, MessageCircle } from 'lucide-react';
import type { StoreSettings } from '../types/database';

interface FooterProps {
  storeSettings?: StoreSettings | null;
}

export default function Footer({ storeSettings }: FooterProps) {

  const socialLinks = [
    { url: storeSettings?.facebook_url, icon: Facebook, label: 'Facebook' },
    { url: storeSettings?.instagram_url, icon: Instagram, label: 'Instagram' },
    { url: storeSettings?.twitter_url, icon: Twitter, label: 'Twitter' },
    { url: storeSettings?.snapchat_url, icon: Snapchat, label: 'Snapchat' },
    { url: storeSettings?.tiktok_url, icon: Youtube, label: 'TikTok' },
  ].filter(link => link.url);

  return (
    <footer className="bg-secondary/5 backdrop-blur-md border-t border-secondary/20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-4">

          {socialLinks.length > 0 && (
            <div className="flex gap-4 mb-4">
              {socialLinks.map((link, index) => (
                link.url && (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary/80 hover:text-accent transition-colors duration-300"
                    title={link.label}
                  >
                    <link.icon className="h-6 w-6" />
                  </a>
                )
              ))}
            </div>
          )}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <a
              href="tel:01222582955"
              className="flex items-center gap-2 bg-[#c1121f]/20 hover:bg-[#c1121f]/30 px-4 py-2 rounded-lg border border-[#c1121f]/30 transition-all duration-300"
            >
              <Phone className="h-4 w-4 text-[#c1121f]" />
              <span className="text-gray-800 text-sm font-medium">01222582955</span>
            </a>
            <a
              href="https://wa.me/201099490594"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#1e88e5]/20 hover:bg-[#1e88e5]/30 px-4 py-2 rounded-lg border border-[#1e88e5]/30 transition-all duration-300"
            >
              <MessageCircle className="h-4 w-4 text-[#1e88e5]" />
              <span className="text-gray-800 text-sm font-medium">01099490594</span>
            </a>
          </div>

          <div className="flex flex-col items-center gap-2">
            <p className="text-gray-500 flex items-center gap-2 text-sm">
              تم تطوير الموقع بواسطة
            </p>
            <a href="https://RHM-Digital.com" className="flex items-center gap-2 bg-gray-800 px-3 py-1.5 rounded hover:opacity-80 transition-opacity">
              <img
                src="https://res.cloudinary.com/dvikey3wc/image/upload/v1777537041/RH_PRODUCTION_-_%D8%A7%D9%84%D9%87%D9%88%D9%8A%D8%A9_3_klfr9t.png"
                alt="RHM Digital Solutions"
                className="h-5 w-auto"
              />
              <span className="text-white font-semibold">RHM Digital Solutions</span>
            </a>
          </div>

          <Link
            to="/admin/login"
            className="text-secondary/0 hover:text-accent transition-colors duration-300 flex justify-center items-center"
          >
            لوحة التحكم
          </Link>
        </div>
      </div>
    </footer>
  );
}