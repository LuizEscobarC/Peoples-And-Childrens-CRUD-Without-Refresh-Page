const ajax = async (url, data, method, contentType) => {
    const load = document.querySelector(".ajax_load");
    load.style.display = 'flex';
    const callback = await fetch(url, {
        method: method,
        body: data,
        headers: {
            'Content-Type': contentType
        }
    });
    load.style.display = 'none';
    return await callback.json();
}