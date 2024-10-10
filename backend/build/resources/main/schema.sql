USE found1;
CREATE TABLE IF NOT EXISTS Board (
                       id INT AUTO_INCREMENT PRIMARY KEY,
                       title VARCHAR(255),
                       content TEXT,
                       filename VARCHAR(255),
                       filepath VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Category (
                          id BIGINT AUTO_INCREMENT PRIMARY KEY,
                          name VARCHAR(255),
                          parent_id BIGINT,
                          FOREIGN KEY (parent_id) REFERENCES Category(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS User (
                      id BIGINT AUTO_INCREMENT PRIMARY KEY,
                      user_id VARCHAR(255),
                      password VARCHAR(255),
                      username VARCHAR(255),
                      address VARCHAR(255),
                      phone VARCHAR(255),
                      email VARCHAR(255),
                      nickname VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Post (
                      id BIGINT AUTO_INCREMENT PRIMARY KEY,
                      title VARCHAR(255),
                      content TEXT,
                      user_id BIGINT NOT NULL,
                      category_id BIGINT NOT NULL,
                      created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                      modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                      is_edited BOOLEAN DEFAULT FALSE,
                      FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE,
                      FOREIGN KEY (category_id) REFERENCES Category(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Comment (
                         id BIGINT AUTO_INCREMENT PRIMARY KEY,
                         user_id BIGINT NOT NULL,
                         post_id BIGINT NOT NULL,
                         content TEXT NOT NULL,
                         parent_id BIGINT,
                         is_deleted BOOLEAN DEFAULT FALSE,
                         is_edited BOOLEAN DEFAULT FALSE,
                         created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                         modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                         FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE,
                         FOREIGN KEY (post_id) REFERENCES Post(id) ON DELETE CASCADE,
                         FOREIGN KEY (parent_id) REFERENCES Comment(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Comment_Like (
                             id BIGINT AUTO_INCREMENT PRIMARY KEY,
                             user_id BIGINT,
                             comment_id BIGINT,
                             FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE,
                             FOREIGN KEY (comment_id) REFERENCES Comment(id) ON DELETE CASCADE
);



CREATE TABLE IF NOT EXISTS PostImage (
                           id BIGINT AUTO_INCREMENT PRIMARY KEY,
                           url VARCHAR(255),
                           post_id BIGINT NOT NULL,
                           FOREIGN KEY (post_id) REFERENCES Post(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Post_Like (
                          id BIGINT AUTO_INCREMENT PRIMARY KEY,
                          user_id BIGINT NOT NULL,
                          post_id BIGINT NOT NULL,
                          FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE,
                          FOREIGN KEY (post_id) REFERENCES Post(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Post_Scrap (
                           id BIGINT AUTO_INCREMENT PRIMARY KEY,
                           user_id BIGINT NOT NULL,
                           post_id BIGINT NOT NULL,
                           FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE,
                           FOREIGN KEY (post_id) REFERENCES Post(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Region (
                        id BIGINT AUTO_INCREMENT PRIMARY KEY,
                        metropolitan VARCHAR(255),
                        district VARCHAR(255),
                        user_id BIGINT NOT NULL,
                        FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE
);



show TABLES;