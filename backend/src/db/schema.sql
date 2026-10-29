-- ========================================================
-- SurfSync Database Schema & Seed Data
-- Database: surfsyncinfotech
-- Server: 62.72.13.157
-- ========================================================

-- 1. Create database
CREATE DATABASE IF NOT EXISTS `surfsyncinfotech`
  CHARACTER SET utf8mb4 
  COLLATE utf8mb4_unicode_ci;

USE `surfsyncinfotech`;

-- 2. Jobs Table
CREATE TABLE IF NOT EXISTS `jobs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `icon` VARCHAR(32) NOT NULL,
  `title` VARCHAR(160) NOT NULL,
  `meta` VARCHAR(220) NOT NULL,
  `job_type` VARCHAR(40) NOT NULL,
  `area` VARCHAR(80) NOT NULL,
  `place` VARCHAR(80) NOT NULL,
  `doing_json` JSON NOT NULL,
  `looking_json` JSON NOT NULL,
  `about` TEXT NOT NULL,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `sort_order` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. FAQs Table
CREATE TABLE IF NOT EXISTS `faqs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `question` VARCHAR(300) NOT NULL,
  `answer` TEXT NOT NULL,
  `sort_order` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Applications Table
CREATE TABLE IF NOT EXISTS `applications` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `job_id` INT NULL,
  `job_title` VARCHAR(160) NOT NULL,
  `full_name` VARCHAR(160) NOT NULL,
  `email` VARCHAR(190) NOT NULL,
  `portfolio_url` VARCHAR(500) NOT NULL DEFAULT '',
  `why_surfsync` VARCHAR(600) NOT NULL DEFAULT '',
  `resume_original_name` VARCHAR(255) NULL,
  `resume_stored_name` VARCHAR(255) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_applications_job` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Contact / Project Inquiries Table
CREATE TABLE IF NOT EXISTS `contact_inquiries` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `full_name` VARCHAR(160) NOT NULL,
  `email` VARCHAR(190) NOT NULL,
  `country_code` VARCHAR(10) NOT NULL DEFAULT '+91',
  `phone` VARCHAR(30) NOT NULL,
  `service` VARCHAR(100) NOT NULL,
  `message` TEXT NOT NULL,
  `status` VARCHAR(20) NOT NULL DEFAULT 'new',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Seed Jobs (Only inserts if table is empty)
INSERT INTO `jobs` (`icon`, `title`, `meta`, `job_type`, `area`, `place`, `doing_json`, `looking_json`, `about`, `is_active`, `sort_order`)
SELECT 'pencil', 'Product Designer', 'Design · Full-time · Hybrid', 'Full-time', 'Design', 'Hybrid',
  '["Craft intuitive user journeys and interfaces for web and mobile products.", "Work closely with product and engineering teams to prototype and validate ideas.", "Improve existing products through user feedback and design iterations."]',
  '["A strong portfolio showcasing your design process and problem-solving.", "Good understanding of interaction and visual design principles.", "Clear communication skills and a curiosity to learn and grow."]',
  'You’ll work on diverse projects across industries, from early concepts to real-world products, and help shape user experiences that make an impact.',
  1, 1
WHERE NOT EXISTS (SELECT 1 FROM `jobs` WHERE `title` = 'Product Designer');

INSERT INTO `jobs` (`icon`, `title`, `meta`, `job_type`, `area`, `place`, `doing_json`, `looking_json`, `about`, `is_active`, `sort_order`)
SELECT 'code', 'Frontend Developer', 'Engineering · Full-time · Hybrid', 'Full-time', 'Engineering', 'Hybrid',
  '["Build fast, accessible interfaces for web products using React.", "Turn design files into pixel-accurate, responsive screens.", "Work with backend and design teammates to ship features end to end."]',
  '["Solid experience with React, modern JavaScript, and CSS.", "An eye for detail and care about performance and accessibility.", "Comfort giving and receiving feedback in code reviews."]',
  'You’ll join a team that ships web products for clients across industries, with room to own features from first sketch to launch.',
  1, 2
WHERE NOT EXISTS (SELECT 1 FROM `jobs` WHERE `title` = 'Frontend Developer');

INSERT INTO `jobs` (`icon`, `title`, `meta`, `job_type`, `area`, `place`, `doing_json`, `looking_json`, `about`, `is_active`, `sort_order`)
SELECT 'robot', 'AI Automation Intern', 'AI & Automation · Internship · Hybrid', 'Internship', 'AI & Automation', 'Hybrid',
  '["Help build and test automation workflows and AI-assisted tools.", "Research models, prompts, and integrations for client use cases.", "Document what works so the team can reuse it."]',
  '["Basic Python or JavaScript and an interest in applied AI.", "Curiosity about how automation can remove repetitive work.", "Willingness to learn quickly with mentoring from the team."]',
  'This internship gives hands-on experience with real client automation projects, guided by engineers who build them every day.',
  1, 3
WHERE NOT EXISTS (SELECT 1 FROM `jobs` WHERE `title` = 'AI Automation Intern');

INSERT INTO `jobs` (`icon`, `title`, `meta`, `job_type`, `area`, `place`, `doing_json`, `looking_json`, `about`, `is_active`, `sort_order`)
SELECT 'chart', 'Business Development Executive', 'Growth · Full-time · Noida', 'Full-time', 'Growth', 'Noida',
  '["Identify and reach out to potential clients for our digital services.", "Understand client needs and work with the team on proposals.", "Keep the pipeline organised and follow up consistently."]',
  '["Strong communication and relationship-building skills.", "An interest in technology products and how they solve business problems.", "Self-driven and comfortable working towards targets."]',
  'You’ll be the first point of contact for new clients and help grow SurfSync’s presence across industries.',
  1, 4
WHERE NOT EXISTS (SELECT 1 FROM `jobs` WHERE `title` = 'Business Development Executive');

-- 6. Seed FAQs (Only inserts if table is empty)
INSERT INTO `faqs` (`question`, `answer`, `sort_order`)
SELECT 'What is the interview process like?',
  'We start with a short intro call, followed by a conversation with the team and, for some roles, a small practical task. We keep you updated at every step.',
  1
WHERE NOT EXISTS (SELECT 1 FROM `faqs` WHERE `question` = 'What is the interview process like?');

INSERT INTO `faqs` (`question`, `answer`, `sort_order`)
SELECT 'Can I apply for more than one role?',
  'I work with clients globally. I have experience collaborating with businesses and individuals across different time zones, utilizing digital communication tools like Zoom, Slack, and email to ensure seamless project management.',
  2
WHERE NOT EXISTS (SELECT 1 FROM `faqs` WHERE `question` = 'Can I apply for more than one role?');

INSERT INTO `faqs` (`question`, `answer`, `sort_order`)
SELECT 'Do you offer internships?',
  'Yes. We offer internships in areas like AI and automation, design, and engineering. Select the internship role above to apply.',
  3
WHERE NOT EXISTS (SELECT 1 FROM `faqs` WHERE `question` = 'Do you offer internships?');

INSERT INTO `faqs` (`question`, `answer`, `sort_order`)
SELECT 'What if there’s no role for me right now?',
  'Send us your portfolio or LinkedIn profile with a short note about what you’d like to work on, and we’ll keep it on file for future openings.',
  4
WHERE NOT EXISTS (SELECT 1 FROM `faqs` WHERE `question` = 'What if there’s no role for me right now?');
