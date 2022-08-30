-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 10, 2022 at 08:55 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.9

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
-- Table structure for table `how_we_work`
--

CREATE TABLE `how_we_work` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `icon` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bg` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title_ar` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title_en` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description_en` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description_ar` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `how_we_work`
--

INSERT INTO `how_we_work` (`id`, `icon`, `bg`, `title_ar`, `title_en`, `description_en`, `description_ar`, `created_at`, `updated_at`) VALUES
(1, '/appIcons/step1.svg', '/appIcons/withoutBorder.png', 'step 1', 'step 1', 'سجل كمستثمر', 'سجل كمستثمر', NULL, NULL),
(2, '/appIcons/step2.svg', '/appIcons/withBorderTop.png', 'step 2', 'step 2', 'اشحن رصيدك من خلال الآيبان الخاص بك', 'اشحن رصيدك من خلال الآيبان الخاص بك', NULL, NULL),
(3, '/appIcons/step3.svg', '/appIcons/withBorderTop.png', 'step 3', 'step 3', 'ابحث عن الفرصة الاستثمارية التي تتوافق مع أولوياتك', 'ابحث عن الفرصة الاستثمارية التي تتوافق مع أولوياتك', NULL, NULL),
(4, '/appIcons/step4.svg', '/appIcons/withBorderBottom.png', 'step 4', 'step 4', 'الموافقة على الشروط والأحكام', 'الموافقة على الشروط والأحكام', NULL, NULL),
(5, '/appIcons/step5.svg', '/appIcons/withBorderBottom.png', 'step 5', 'step 5', 'الموافقة على الشروط والأحكام', 'الموافقة على الشروط والأحكام', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `how_we_work`
--
ALTER TABLE `how_we_work`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `how_we_work`
--
ALTER TABLE `how_we_work`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
