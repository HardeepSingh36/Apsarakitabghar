
const Reviews = () => {
  return (
      <div className='review-box'>
        <div className='row'>
          <div className='col-xl-5'>
            <div className='product-rating-box'>
              <div className='row'>
                <div className='col-xl-12'>
                  <div className='product-main-rating'>
                    <h2>
                      3.40
                      <i data-feather='star'></i>
                    </h2>

                    <h5>5 Overall Rating</h5>
                  </div>
                </div>

                <div className='col-xl-12'>
                  <ul className='product-rating-list'>
                    <li>
                      <div className='rating-product'>
                        <h5>
                          5<i data-feather='star'></i>
                        </h5>
                        <div className='progress'>
                          <div className='progress-bar' style={{ width: '40%' }}></div>
                        </div>
                        <h5 className='total'>2</h5>
                      </div>
                    </li>
                    <li>
                      <div className='rating-product'>
                        <h5>
                          4<i data-feather='star'></i>
                        </h5>
                        <div className='progress'>
                          <div className='progress-bar' style={{ width: '20%' }}></div>
                        </div>
                        <h5 className='total'>1</h5>
                      </div>
                    </li>
                    <li>
                      <div className='rating-product'>
                        <h5>
                          3<i data-feather='star'></i>
                        </h5>
                        <div className='progress'>
                          <div className='progress-bar' style={{ width: '0%' }}></div>
                        </div>
                        <h5 className='total'>0</h5>
                      </div>
                    </li>
                    <li>
                      <div className='rating-product'>
                        <h5>
                          2<i data-feather='star'></i>
                        </h5>
                        <div className='progress'>
                          <div className='progress-bar' style={{ width: '20%' }}></div>
                        </div>
                        <h5 className='total'>1</h5>
                      </div>
                    </li>
                    <li>
                      <div className='rating-product'>
                        <h5>
                          1<i data-feather='star'></i>
                        </h5>
                        <div className='progress'>
                          <div className='progress-bar' style={{ width: '20%' }}></div>
                        </div>
                        <h5 className='total'>1</h5>
                      </div>
                    </li>
                  </ul>

                  <div className='review-title-2'>
                    <h4 className='fw-bold'>Review this product</h4>
                    <p>Let other customers know what you think</p>
                    <button
                      className='btn'
                      type='button'
                      data-bs-toggle='modal'
                      data-bs-target='#writereview'
                    >
                      Write a review
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='col-xl-7'>
            <div className='review-people'>
              <ul className='review-list'>
                <li>
                  <div className='people-box'>
                    <div>
                      <div className='people-image people-text'>
                        <img alt='user' className='img-fluid ' src='/assets/images/review/1.jpg' />
                      </div>
                    </div>
                    <div className='people-comment'>
                      <div className='people-name'>
                        <a href='javascript:void(0)' className='name'>
                          Jack Doe
                        </a>
                        <div className='date-time'>
                          <h6 className='text-content'> 29 Sep 2023 06:40:PM</h6>
                          <div className='product-rating'>
                            <ul className='rating'>
                              <li>
                                <i data-feather='star' className='fill'></i>
                              </li>
                              <li>
                                <i data-feather='star' className='fill'></i>
                              </li>
                              <li>
                                <i data-feather='star' className='fill'></i>
                              </li>
                              <li>
                                <i data-feather='star' className='fill'></i>
                              </li>
                              <li>
                                <i data-feather='star'></i>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className='reply'>
                        <p>
                          Avoid this product. The quality is terrible, and it started falling apart
                          almost immediately. I wish I had read more reviews before buying. Lesson
                          learned.
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className='people-box'>
                    <div>
                      <div className='people-image people-text'>
                        <img alt='user' className='img-fluid ' src='/assets/images/review/2.jpg' />
                      </div>
                    </div>
                    <div className='people-comment'>
                      <div className='people-name'>
                        <a href='javascript:void(0)' className='name'>
                          Jessica Miller
                        </a>
                        <div className='date-time'>
                          <h6 className='text-content'> 29 Sep 2023 06:34:PM</h6>
                          <div className='product-rating'>
                            <div className='product-rating'>
                              <ul className='rating'>
                                <li>
                                  <i data-feather='star' className='fill'></i>
                                </li>
                                <li>
                                  <i data-feather='star' className='fill'></i>
                                </li>
                                <li>
                                  <i data-feather='star' className='fill'></i>
                                </li>
                                <li>
                                  <i data-feather='star' className='fill'></i>
                                </li>
                                <li>
                                  <i data-feather='star'></i>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='reply'>
                        <p>
                          Honestly, I regret buying this item. The quality is subpar, and it feels
                          like a waste of money. I wouldn't recommend it to anyone.
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className='people-box'>
                    <div>
                      <div className='people-image people-text'>
                        <img alt='user' className='img-fluid ' src='/assets/images/review/3.jpg' />
                      </div>
                    </div>
                    <div className='people-comment'>
                      <div className='people-name'>
                        <a href='javascript:void(0)' className='name'>
                          Rome Doe
                        </a>
                        <div className='date-time'>
                          <h6 className='text-content'> 29 Sep 2023 06:18:PM</h6>
                          <div className='product-rating'>
                            <ul className='rating'>
                              <li>
                                <i data-feather='star' className='fill'></i>
                              </li>
                              <li>
                                <i data-feather='star' className='fill'></i>
                              </li>
                              <li>
                                <i data-feather='star' className='fill'></i>
                              </li>
                              <li>
                                <i data-feather='star' className='fill'></i>
                              </li>
                              <li>
                                <i data-feather='star'></i>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className='reply'>
                        <p>
                          I am extremely satisfied with this purchase. The item arrived promptly,
                          and the quality is exceptional. It's evident that the makers paid
                          attention to detail. Overall, a fantastic buy!
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className='people-box'>
                    <div>
                      <div className='people-image people-text'>
                        <img alt='user' className='img-fluid ' src='/assets/images/review/4.jpg' />
                      </div>
                    </div>
                    <div className='people-comment'>
                      <div className='people-name'>
                        <a href='javascript:void(0)' className='name'>
                          Sarah Davis
                        </a>
                        <div className='date-time'>
                          <h6 className='text-content'> 29 Sep 2023 05:58:PM</h6>
                          <div className='product-rating'>
                            <ul className='rating'>
                              <li>
                                <i data-feather='star' className='fill'></i>
                              </li>
                              <li>
                                <i data-feather='star' className='fill'></i>
                              </li>
                              <li>
                                <i data-feather='star' className='fill'></i>
                              </li>
                              <li>
                                <i data-feather='star' className='fill'></i>
                              </li>
                              <li>
                                <i data-feather='star'></i>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className='reply'>
                        <p>
                          I am genuinely delighted with this item. It's a total winner! The quality
                          is superb, and it has added so much convenience to my daily routine.
                          Highly satisfied customer!
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className='people-box'>
                    <div>
                      <div className='people-image people-text'>
                        <img alt='user' className='img-fluid ' src='/assets/images/review/5.jpg' />
                      </div>
                    </div>
                    <div className='people-comment'>
                      <div className='people-name'>
                        <a href='javascript:void(0)' className='name'>
                          John Doe
                        </a>
                        <div className='date-time'>
                          <h6 className='text-content'> 29 Sep 2023 05:22:PM</h6>
                          <div className='product-rating'>
                            <ul className='rating'>
                              <li>
                                <i data-feather='star' className='fill'></i>
                              </li>
                              <li>
                                <i data-feather='star' className='fill'></i>
                              </li>
                              <li>
                                <i data-feather='star' className='fill'></i>
                              </li>
                              <li>
                                <i data-feather='star' className='fill'></i>
                              </li>
                              <li>
                                <i data-feather='star'></i>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className='reply'>
                        <p>
                          Very impressed with this purchase. The item is of excellent quality, and
                          it has exceeded my expectations.
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Reviews
