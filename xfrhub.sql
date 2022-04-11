/*
 Navicat Premium Data Transfer

 Source Server         : xufengri
 Source Server Type    : MySQL
 Source Server Version : 80028
 Source Host           : 127.0.0.1:3306
 Source Schema         : xfrhub

 Target Server Type    : MySQL
 Target Server Version : 80028
 File Encoding         : 65001

 Date: 11/04/2022 14:25:26
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `moment_id` int NOT NULL,
  `user_id` int NOT NULL,
  `comment_id` int NULL DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `moment_id`(`moment_id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  INDEX `comment_id`(`comment_id`) USING BTREE,
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`moment_id`) REFERENCES `moment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_3` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES (2, '123312123zhenhgao', 1, 2, NULL, '2022-04-09 15:37:01', '2022-04-09 17:09:53');
INSERT INTO `comment` VALUES (4, '你好', 1, 2, NULL, '2022-04-09 16:03:26', '2022-04-09 16:03:26');
INSERT INTO `comment` VALUES (5, '发表了评论', 1, 2, NULL, '2022-04-09 16:39:24', '2022-04-09 16:39:24');
INSERT INTO `comment` VALUES (6, '发表了评论1111', 1, 2, NULL, '2022-04-09 16:39:42', '2022-04-09 16:39:42');
INSERT INTO `comment` VALUES (7, '得要好好读书', 1, 2, NULL, '2022-04-09 18:58:02', '2022-04-09 18:58:02');

-- ----------------------------
-- Table structure for moment
-- ----------------------------
DROP TABLE IF EXISTS `moment`;
CREATE TABLE `moment`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_id` int NOT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  CONSTRAINT `moment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of moment
-- ----------------------------
INSERT INTO `moment` VALUES (1, '修改之后的数据~', 1, '2022-04-09 11:18:53', '2022-04-09 14:40:46');
INSERT INTO `moment` VALUES (2, '你不知道的js', 1, '2022-04-09 11:55:57', '2022-04-09 11:55:57');
INSERT INTO `moment` VALUES (4, '不知道会怎么杨', 2, '2022-04-09 12:33:30', '2022-04-09 12:33:30');
INSERT INTO `moment` VALUES (5, '今天真好', 2, '2022-04-09 12:33:38', '2022-04-09 12:33:38');
INSERT INTO `moment` VALUES (6, '买它', 2, '2022-04-09 12:33:46', '2022-04-09 12:33:46');
INSERT INTO `moment` VALUES (7, '很好', 2, '2022-04-09 12:33:50', '2022-04-09 12:33:50');
INSERT INTO `moment` VALUES (8, '哈哈', 2, '2022-04-09 12:33:56', '2022-04-09 12:33:56');
INSERT INTO `moment` VALUES (9, '哈哈', 2, '2022-04-09 14:23:39', '2022-04-09 14:23:39');
INSERT INTO `moment` VALUES (10, '哈哈', 2, '2022-04-09 14:26:08', '2022-04-09 14:26:08');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'lili', '202cb962ac59075b964b07152d234b70', '2022-04-09 11:17:51', '2022-04-09 11:17:51');
INSERT INTO `user` VALUES (2, 'Bob', '202cb962ac59075b964b07152d234b70', '2022-04-09 11:26:34', '2022-04-09 11:26:34');
INSERT INTO `user` VALUES (6, 'xfr', '202cb962ac59075b964b07152d234b70', '2022-04-09 16:41:43', '2022-04-09 16:41:43');

SET FOREIGN_KEY_CHECKS = 1;
