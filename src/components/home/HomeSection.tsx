import SearchBox from './SearchBox';

const HomeSection = () => {
  return (
    <section className='home-section-2 home-section-bg pt-4 md:!pt-0 overflow-x-hidden'>
      <div className='relative container-fluid p-0 ratio_27'>
        <div className='row'>
          <div className='col-12'>
            <div className='slider-animate skeleton-banner-xl'>
              <div>
                <div className='!h-60 md:!h-80 !bg-gradient-to-br !from-[#e95520] !to-[#e42f22]'>
                  {/* <img
                    src='assets/images/book/banner/banner.jpg'
                    alt='banner'
                    className='w-full object-cover h-full'
                  /> */}
                  <div></div>
                </div>
              </div>
            </div>
          </div>
          {/* 🔍 Search Bar Overlay */}
          <div className='absolute inset-0 top-1/5 flex items-start justify-center px-4 overflow-hidden'>
            <SearchBox />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
