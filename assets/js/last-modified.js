---
---
// 自动获取最后修改时间
fetch('https://api.github.com/repos/{{ site.github.owner_name }}/{{ site.github.repository_name }}/commits?per_page=1')
  .then(response => response.json())
  .then(data => {
    if (data && data[0] && data[0].commit && data[0].commit.committer) {
      const date = new Date(data[0].commit.committer.date);
      const formatted = date.toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      document.getElementById('last-modified').textContent = formatted;
    }
  })
  .catch(() => {
    // 如果 API 调用失败，显示构建时间
    document.getElementById('last-modified').textContent = '{{ site.time | date: "%d/%m/%Y %H:%M:%S" }}';
  });
