const forumLatest = "https://cdn.freecodecamp.org/curriculum/forum-latest/latest.json";
const forumTopicUrl = "https://forum.freecodecamp.org/t/";
const forumCategoryUrl = "https://forum.freecodecamp.org/c/";
const avatarUrl = "https://sea1.discourse-cdn.com/freecodecamp";

const postsContainer = document.getElementById("posts-container");

const timeAgo = (time) => {
  const currentTime = new Date();
  const lastPost = new Date(time);
  const diffInMs = currentTime - lastPost; // Difference in milliseconds
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60)); // Convert to minutes

  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60); // Convert to hours
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24); // Convert to days
  return `${diffInDays}d ago`;
  
};

const fetchData = async () => {
  try {
    const res = await fetch(forumLatest);
    const data = await res.json();
    showLatestPosts(data);
  } catch (err) {
    console.log(err);
  }
};

fetchData();

const showLatestPosts = (data) => {
  const { topic_list, users } = data;
  const { topics } = topic_list;

  postsContainer.innerHTML = topics.map((item) => {
    const {
      id,
      title,
      views,
      posts_count,
      slug,
      posters,
      category_id,
      bumped_at,
    } = item;

    return `
    <tr>
      <td>
        <p class="post-title">${title}</p>
      </td>
      <td></td>
      <td>${posts_count - 1}</td>
      <td>${views}</td>
      <td></td>
    </tr>`;
  }).join("");
};

