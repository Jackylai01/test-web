type Props = {
  className?: string;
};

const FacebookAside = ({ className }: Props) => {
  return (
    <aside className={`main__aside ${className}`}>
      <iframe
        src='https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fntpchealth%2F&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId'
        width='340'
        height='500'
        title='新北衛什麼 Facebook 粉絲專頁'
        allow='autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share'
      />
    </aside>
  );
};

export default FacebookAside;
