-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 11, 2022 at 03:34 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.4.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `laravel`
--

-- --------------------------------------------------------

--
-- Table structure for table `profile_menu`
--

CREATE TABLE `profile_menu` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `icon` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `text_ar` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `text_en` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `profile_menu`
--

INSERT INTO `profile_menu` (`id`, `icon`, `text_ar`, `text_en`, `url`, `created_at`, `updated_at`) VALUES
(1, '/appIcons/user.svg', 'صفحتي الشخصية', 'My profile', '/myAccount', NULL, NULL),
(2, '/appIcons/saved.svg', 'المحفوظات', 'Saved', '#', NULL, NULL),
(3, '/appIcons/wallet.svg', 'المحفظة', 'wallet', '#', NULL, NULL),
(4, '/appIcons/referral.svg', 'رابط التحويل', 'Referral link', '#', NULL, NULL),
(5, '/appIcons/setting.svg', 'الضبط', 'Settings', '#', NULL, NULL),
(6, '/appIcons/help.svg', 'المساعدة والدعم', 'help & support', '#', NULL, NULL);
INSERT INTO `side_menu` (`id`, `icon`, `text_ar`, `text_en`, `url`, `created_at`, `updated_at`) VALUES
(1, '/appIcons/home.svg', 'الصفحة الرئيسية', 'Homepage', '/', NULL, NULL),
(2, '/appIcons/my_investment.svg', 'استثماراتي', 'My investment', '/dashboard', NULL, NULL),
(3, '/appIcons/wallet.svg', 'المحفظة', 'wallet', '/wallet', NULL, NULL),
(4, '/appIcons/saved.svg', 'المحفوظات', 'Saved', '/bookmarks', NULL, NULL),
(5, '/appIcons/referral.svg', 'رابط التحويل', 'Referral link', '#', NULL, NULL);
--
-- Indexes for dumped tables
--

--
-- Indexes for table `profile_menu`
--
ALTER TABLE `profile_menu`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `profile_menu`
--
ALTER TABLE `profile_menu`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
