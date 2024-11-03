import { DB } from "https://deno.land/x/sqlite/mod.ts";
import { dirname, fromFileUrl, join } from "https://deno.land/std/path/mod.ts";


// __dirname Is never getting used again, It's only needed because the DB Import
// from SQLite doesn't like relative paths, so I use this as 
// A Workaround
const __dirname:string = dirname(fromFileUrl(import.meta.url));
const dbPath:string = join(__dirname, "../database/esp-projekt.sqlite");
const db = new DB(dbPath);

// Interfaces
interface Post {
    posts_uuid: number;
    user_id: number;
    created_at: string;
    post_text: string;
    likes: number;
    comments: number;
}


async function getPostsFromDB() {
    let dataresult: Array<Post> = [];
    try {
        const rows = await db.query("SELECT * FROM posts");
        
        // Assuming `db.query` returns an array of arrays or tuples
        for (const row of rows) {
            const [posts_uuid, user_id, created_at, post_text, likes, comments] = row;

            dataresult.push({
                posts_uuid: Number(posts_uuid),  // Convert to string if necessary
                user_id: Number(user_id),
                created_at: String(created_at),  // Convert to Date if necessary
                post_text: String(post_text),
                likes: Number(likes),  // Convert to number if necessary
                comments: Number(comments),  // Convert to number if necessary
            });
        }
    } catch (error) {
        console.error("Error fetching posts", error);
    }
    return dataresult;
}

// Test Function, not useful
async function countPosts(): Promise<number> {
    let count = 0;
    try {
        for (const [c] of await db.query("SELECT COUNT(*) FROM posts")) {
            count = c as number; 
        }
    } catch (error) {
        console.error("Error counting posts:", error);
    }
    console.log("Total posts:", count);
    return count;
}

function getCommentsForPost(postid: bigint) {
}

function getCommentsForComments(commentid: bigint) {
}

function getAllUsers() {
    const users = [];
    for (
        const [
            user_id,
            user_group,
            bio,
            displayname,
            username,
            user_email,
            password,
            firstname,
            surname,
            account_created,
            blocked_users,
            followers,
            following,
            contacts,
        ] of db.query("SELECT * FROM Accounts")
    ) {
        users.push({
            user_id,
            user_group,
            bio,
            displayname,
            username,
            user_email,
            password,
            firstname,
            surname,
            account_created,
            blocked_users,
            followers,
            following,
            contacts,
        });
    }
    return users;
}

function getUserByID(userid: bigint) {
}

function getAllPostsFromUser() {
}

// Filter Functions
function filterForImagePosts() {
    return [];
}

function filterForVideoPosts() {
    return [];
}

function filterForTextPosts() {
    return [];
}

// Export all Functions to make this a module
export { 
    getPostsFromDB,
    countPosts,
    getCommentsForPost,
    getCommentsForComments,
    getAllUsers,
    getUserByID,
    getAllPostsFromUser,
    filterForImagePosts,
    filterForVideoPosts,
    filterForTextPosts
};
