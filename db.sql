--
-- Database: `smart-gas`
--

drop database if exists `smart-gas`;
create database if not exists `smart-gas`;

use `smart-gas`;

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `role` enum('ADMIN', 'CUSTOMER', 'RETAILER') DEFAULT 'CUSTOMER',
  `is_active` boolean default true,
  primary key(id)
);


--
-- Table structure for table `retailers`
--

CREATE TABLE `retailers` (
  `id` int(10) AUTO_INCREMENT NOT NULL,
  `name` varchar(100) NOT NULL,
  `longitude` varchar(250) NOT NULL,
  `latitude` varchar(250) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int(11) NOT NULL,
  FOREIGN key (user_id) REFERENCES users(id) on delete cascade,
  primary key(id)
);


--
-- Table structure for table `product`
--

CREATE TABLE `products` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `brand` varchar(40) NOT NULL,
  `size` varchar(6) NOT NULL,
  `price` double(10, 2) default 0.0,
  `quantity` int(20) NOT NULL,
  `retailer_id` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN key (retailer_id) REFERENCES retailers(id) on delete cascade,
  primary key(id)
);




--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `is_scheduled` tinyint(1) NOT NULL,
  `schedule_time` datetime NOT NULL,
  `status` enum('SEND', 'RECEIVED', 'DELIVERED') default 'SEND',
  `accepted` boolean default false,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int(11) NOT NULL,
  `retailer_id` int(11) NOT NULL,
  FOREIGN key (user_id) REFERENCES users(id) on delete cascade,
  FOREIGN key (retailer_id) REFERENCES retailers(id) on delete cascade,
  primary key(id)
);




--
-- Table structure for table `order_time`
--

CREATE TABLE `order_items` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `item_id` int(11) NOT NULL,
  `quantity` int default 1,
  `order_id` int(11) NOT NULL,
  FOREIGN key (item_id) REFERENCES products(id) on delete cascade,
  FOREIGN key (order_id) REFERENCES orders(id) on delete cascade,
  primary key(id)
);



--
-- Table structure for table `retailers_staff`
--

CREATE TABLE `retailer_staff` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `retailer_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `role` enum( 'REGULAR', 'MID', 'ADMIN' ) default 'REGULAR',
  FOREIGN key (user_id) REFERENCES users(id) on delete cascade,
  primary key(id)
);



--  cylinders 
create table `cylinders` (
  `id` int auto_increment,
  `serial_number` varchar(20),
  `manufacture_date` datetime default NOW(),
  `manufacturer_name` varchar(30),
  `capacity` int,
  `batch_number` varchar(40),
  `tracker_number` varchar(30),
  `price` decimal(10, 2),
  `quantity` int,
  `retailer_id` int,
  FOREIGN key(retailer_id) REFERENCES retailers(id),
  primary key(id)
);

-- save the retailer ratings
create table `ratings`(
  `id` int auto_increment,
  `user_id` int, 
  `retailer_id` int,
  `added_on` datetime default NOW(),
  `rating` int default 0,
  FOREIGN key(user_id) REFERENCES users(id),
  FOREIGN key(retailer_id) REFERENCES users(id),
  primary key(id)
);


--   missing cylinders
create table `lost_cylinders`(
  `id` int auto_increment,
  `user_id` int, 
  `cylinder_id` int,
  `lat` varchar(30),
  `lng` varchar(30),
  `recovered` boolean default false,
  `lost_on` datetime default NOW(),
  FOREIGN key(user_id) REFERENCES users(id),
  FOREIGN key(cylinder_id) REFERENCES cylinders(id),
  primary key(id)
);
