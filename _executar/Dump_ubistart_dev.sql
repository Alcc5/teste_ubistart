-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ubistart_dev
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `adonis_schema`
--

DROP TABLE IF EXISTS `adonis_schema`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adonis_schema` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `batch` int NOT NULL,
  `migration_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adonis_schema`
--

LOCK TABLES `adonis_schema` WRITE;
/*!40000 ALTER TABLE `adonis_schema` DISABLE KEYS */;
INSERT INTO `adonis_schema` VALUES (15,'database\\migrations\\1632267443270_todos',1,'2021-09-24 20:03:10'),(16,'database\\migrations\\1632267956553_users',1,'2021-09-24 20:03:10');
/*!40000 ALTER TABLE `adonis_schema` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `todos`
--

DROP TABLE IF EXISTS `todos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `todos` (
  `id` char(36) NOT NULL,
  `description` varchar(255) NOT NULL,
  `deadline` datetime NOT NULL,
  `closed_at` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `user_id` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `todos`
--

LOCK TABLES `todos` WRITE;
/*!40000 ALTER TABLE `todos` DISABLE KEYS */;
INSERT INTO `todos` VALUES ('4984292d-b6a1-46ac-bd5d-f6e4eacc4ab4','descricao do teste atualizada','2021-09-28 00:00:00','2021-09-26 21:24:56','2021-09-26 23:56:19','2021-09-27 00:24:56','42f486d0-812d-4505-ad1c-e8c8151e441d'),('c943bf4e-8221-49e2-bf00-136448e4dea0','descricao descritiva 2','2021-09-27 00:00:00','2021-09-24 17:18:02','2021-09-24 20:04:41','2021-09-24 20:18:02','42f486d0-812d-4505-ad1c-e8c8151e441d'),('c943bf4e-8221-49e2-bf00-136448e4dea1','descricao descritiva 2','2021-09-27 00:00:00','2021-09-24 17:18:02','2021-09-24 20:04:41','2021-09-24 20:18:02','42f486d0-812d-4505-ad1c-e8c8151e441d'),('c943bf4e-8221-49e2-bf00-136448e4dea2','descricao descritiva 2','2021-09-27 00:00:00','2021-09-24 17:18:02','2021-09-24 20:04:41','2021-09-24 20:18:02','42f486d0-812d-4505-ad1c-e8c8151e441d'),('c943bf4e-8221-49e2-bf00-136448e4dea3','descricao descritiva2','2021-09-26 00:00:00',NULL,'2021-09-24 20:04:41','2021-09-24 20:04:41','e15a646f-ee09-49ca-85ce-ca799d078ba9'),('c943bf4e-8221-49e2-bf00-136448e4dea4','descricao descritiva3','2021-09-24 00:00:00',NULL,'2021-09-24 20:04:41','2021-09-24 20:04:41','42f486d0-812d-4505-ad1c-e8c8151e441d'),('c943bf4e-8221-49e2-bf00-136448e4dea6','descricao descritiva 2','2021-09-27 00:00:00','2021-09-24 17:18:02','2021-09-24 20:04:41','2021-09-24 20:18:02','42f486d0-812d-4505-ad1c-e8c8151e441d'),('c943bf4e-8221-49e2-bf00-136448e4dea7','descricao descritiva 2','2021-09-27 00:00:00','2021-09-24 17:18:02','2021-09-24 20:04:41','2021-09-24 20:18:02','42f486d0-812d-4505-ad1c-e8c8151e441d'),('c943bf4e-8221-49e2-bf00-136448e4dea8','descricao descritiva 2','2021-09-27 00:00:00','2021-09-24 17:18:02','2021-09-24 20:04:41','2021-09-24 20:18:02','42f486d0-812d-4505-ad1c-e8c8151e441d'),('c943bf4e-8221-49e2-bf00-136448e4dea9','descricao descritiva 2','2021-09-27 00:00:00','2021-09-24 17:18:02','2021-09-24 20:04:41','2021-09-24 20:18:02','42f486d0-812d-4505-ad1c-e8c8151e441d'),('c943bf4e-8221-49e2-bf00-136448e4deb1','descricao descritiva 2','2021-09-27 00:00:00','2021-09-24 17:18:02','2021-09-24 20:04:41','2021-09-24 20:18:02','42f486d0-812d-4505-ad1c-e8c8151e441d'),('c943bf4e-8221-49e2-bf00-136448e4deb2','descricao descritiva 2','2021-09-27 00:00:00','2021-09-24 17:18:02','2021-09-24 20:04:41','2021-09-24 20:18:02','42f486d0-812d-4505-ad1c-e8c8151e441d'),('c943bf4e-8221-49e2-bf00-136448e4deb3','descricao descritiva 2','2021-09-27 00:00:00','2021-09-24 17:18:02','2021-09-24 20:04:41','2021-09-24 20:18:02','42f486d0-812d-4505-ad1c-e8c8151e441d');
/*!40000 ALTER TABLE `todos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` char(36) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profile` enum('user','admin') DEFAULT 'user',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('1518518c-b36d-46e2-bec4-4587756cd487','admin@admin.com','$2b$12$6kflYQfE3asqbWw83cEU/ORuFztWU2ECu7qLcjZsE4MMDAHl0qvYO','admin','2021-09-25 02:35:20','2021-09-25 02:35:20'),('42f486d0-812d-4505-ad1c-e8c8151e441d','teste999@teste.com','$2b$12$VURIQmiAP8AyD9OPy4ZdNecnaOs9j9E.nP8YUs36eT6o1vSh6L9PW','user','2021-09-24 20:25:29','2021-09-26 23:41:36'),('cd16a57e-2d1b-4dce-aa58-bdf9952f41e5','test@erro.com','$2b$12$jq9L4ehI3A5vT2TfA774/.ifpnqxidCrAisnLRSUQfs5PQiPmb2E6','user','2021-09-26 22:41:56','2021-09-26 22:41:56'),('e15a646f-ee09-49ca-85ce-ca799d078ba9','teste465@teste.com','$2b$12$hJX6vxDtChYsIoW718u0WeujkdeLxnEak2sHflT1Ccu9Xh.49/paK','user','2021-09-24 20:03:50','2021-09-24 20:03:50');
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

-- Dump completed on 2021-09-26 21:51:21
