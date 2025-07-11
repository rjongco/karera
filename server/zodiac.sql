-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: zodiac8004
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `games`
--

DROP TABLE IF EXISTS `games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `games` (
  `id` int NOT NULL AUTO_INCREMENT,
  `moderatorId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `games`
--

LOCK TABLES `games` WRITE;
/*!40000 ALTER TABLE `games` DISABLE KEYS */;
/*!40000 ALTER TABLE `games` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` enum('load','withdraw','bet') NOT NULL,
  `amount` float NOT NULL,
  `selected` int DEFAULT NULL,
  `userId` int NOT NULL,
  `gameId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `role` varchar(20) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `birthdate` datetime NOT NULL,
  `gender` int NOT NULL,
  `address` text,
  `profilePicture` varchar(255) DEFAULT NULL,
  `mobile` varchar(15) NOT NULL,
  `password` varchar(255) NOT NULL,
  `otp` varchar(255) DEFAULT NULL,
  `otpExpiration` datetime DEFAULT NULL,
  `otpMaxEntries` int DEFAULT NULL,
  `otpMaxEntriesExpiration` datetime DEFAULT NULL,
  `isMobileVerified` tinyint(1) NOT NULL,
  `isEmailVerified` tinyint(1) NOT NULL,
  `balance` decimal(10,2) NOT NULL,
  `totalBets` int NOT NULL,
  `totalWins` int NOT NULL,
  `totalLosses` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'54735066-11d3-42b4-8c6f-ff85445ec781','Moderator','User','moderator','','moderator@mail.com','2024-04-16 14:37:14',0,'Moderator Address',NULL,'09123456789','moderator123',NULL,NULL,20,NULL,1,0,100.00,0,0,0,'2024-04-16 14:37:14','2024-04-16 14:37:14'),(2,'056fe7c1-1850-48ec-a9af-3254e724a681','Player1','User','player','playeruser1','player@mail.com','2024-04-16 14:37:14',0,'Player Address 1',NULL,'09223456789','Player1234','qwerqy',NULL,20,NULL,1,0,0.00,0,0,0,'2024-04-16 14:37:14','2024-04-16 06:37:14'),(3,'e7ac68b1-e0dd-4f01-a1b2-8439ab74a12f','Player2','User','player','playeruser2','player2@mail.com','2024-04-16 14:37:14',0,'Player Address 2',NULL,'09323456789','Player5678','zxcvbn',NULL,20,NULL,1,0,180.00,0,0,0,'2024-04-16 14:37:14','2024-04-16 06:37:14'),(4,'ddc8b095-4287-4855-9d13-4235f7de866b','Player3','User','player','playeruser3','player3@mail.com','2024-04-16 14:37:14',0,'Player Address 3',NULL,'09423456789','Player91011','asdfgh',NULL,20,NULL,1,0,100.00,0,0,0,'2024-04-16 14:37:14','2024-04-16 14:37:14'),(5,'845a745d-8f0d-4102-9e59-43966bc6c841','Player4','User','player','playeruser4','player4@mail.com','2024-04-16 14:37:14',0,'Player Address 4',NULL,'09523456789','Player121314','qwerty',NULL,20,NULL,1,0,100.00,0,0,0,'2024-04-16 14:37:14','2024-04-16 14:37:14'),(6,'180560a1-db94-4311-be2e-3a324d3afb89','Player5','User','player','playeruser5','player5@mail.com','2024-04-16 14:37:14',0,'Player Address 5',NULL,'09223456555','Player1234','qwerqy',NULL,20,NULL,1,0,100.00,0,0,0,'2024-04-16 14:37:14','2024-04-16 14:37:14'),(7,'3629a6b1-ea68-44fc-8782-350aabc65cd3','Player6','User','player','playeruser6','player6@mail.com','2024-04-16 14:37:14',0,'Player Address 6',NULL,'09323456666','Player5678','zxcvbn',NULL,20,NULL,1,0,100.00,0,0,0,'2024-04-16 14:37:14','2024-04-16 14:37:14'),(8,'c009f705-e2a0-4129-b231-6daabc0988c0','Player7','User','player','playeruser7','player7@mail.com','2024-04-16 14:37:14',0,'Player Address 7',NULL,'09423456777','Player91011','asdfgh',NULL,20,NULL,1,0,100.00,0,0,0,'2024-04-16 14:37:14','2024-04-16 14:37:14'),(9,'6bef31bc-8aa3-4842-8178-cb12b37cd89a','Player8','User','player','playeruser8','player8@mail.com','2024-04-16 14:37:14',0,'Player Address 4',NULL,'09523456888','Player121314','qwerty',NULL,20,NULL,1,0,100.00,0,0,0,'2024-04-16 14:37:14','2024-04-16 14:37:14'),(10,'ef7e25e2-ad1c-48d8-94d2-c99cf10d7952','Player9','User','player','playeruser9','player9@mail.com','2024-04-16 14:37:14',0,'Player Address 9',NULL,'09523456999','Player121314','qwerty',NULL,20,NULL,1,0,100.00,0,0,0,'2024-04-16 14:37:14','2024-04-16 14:37:14'),(11,'8ac69598-3cda-4545-a007-ec90dea6e2f7','Player10','User','player','playeruser10','player10@mail.com','2024-04-16 14:37:14',0,'Player Address 5',NULL,'09223456510','Player1234','qwerqy',NULL,20,NULL,1,0,100.00,0,0,0,'2024-04-16 14:37:14','2024-04-16 14:37:14'),(12,'632f6578-534e-4364-aa19-02f95f709607','Player11','User','player','playeruser11','player11@mail.com','2024-04-16 14:37:14',0,'Player Address 11',NULL,'09323456611','Player5678','zxcvbn',NULL,20,NULL,1,0,100.00,0,0,0,'2024-04-16 14:37:14','2024-04-16 14:37:14'),(13,'4bbdb223-534b-4baf-a763-b429357cfa1a','Player12','User','player','playeruser12','player12@mail.com','2024-04-16 14:37:14',0,'Player Address 12',NULL,'09423456712','Player91011','asdfgh',NULL,20,NULL,1,0,100.00,0,0,0,'2024-04-16 14:37:14','2024-04-16 14:37:14');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-16 14:54:09
