                -- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db:3306
-- Generation Time: Apr 25, 2024 at 10:18 AM
-- Server version: 8.3.0
-- PHP Version: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `employee_id` int NOT NULL,
  `employee_name` varchar(255) NOT NULL,
  `employee_lastname` varchar(255) NOT NULL,
  `employee_gender` enum('ชาย','หญิง') NOT NULL,
  `employee_address` varchar(100) NOT NULL,
  `employee_phone` varchar(15) NOT NULL,
  `employee_position` varchar(50) NOT NULL,
  `work_time_in` datetime NOT NULL,
  `work_time_out` datetime NOT NULL,
  `work_hours` int NOT NULL,
  `work_details` text,
  `leave_type` enum('ลาป่วย','ลากิจ','ลาพักร้อน','ลาคลอดบุตร') NOT NULL,
  `leave_date_start` date NOT NULL,
  `leave_date_end` date NOT NULL,
  `leave_reason` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`employee_id`);

--
-- AUTO_INCREMENT for dumped tables
--
INSERT INTO `employees` (`employee_id`, `employee_name`, `employee_lastname`, `employee_gender`, `employee_address`, `employee_phone`, `employee_position`, `work_time_in`, `work_time_out`, `work_hours`, `work_details`, `leave_type`, `leave_date_start`, `leave_date_end`, `leave_reason`) VALUES 
('123456', 'aaaaa', 'ggggg', 'หญิง', 'asdf', '0000000000', 'ni', '2024-04-25 13:43:14.000000', '2024-04-21 20:43:14', '-249', 'u7u7i8k', 'ลาป่วย', '2024-04-25', '2024-04-25', 'gjgjj');
--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `employee_id` int NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
