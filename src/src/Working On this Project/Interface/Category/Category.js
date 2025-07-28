import React, {  useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'
import './Category.css'
// import { Card } from 'antd'
import { Link } from 'react-router-dom';
import Mobile from '../../image/Category_img/mobiles.svg'
import Bags from '../../image/Category_img/bags.svg'
import Laptop from '../../image/Category_img/laptops.svg'
import Car from '../../image/Category_img/cars.svg'
import Document from '../../image/Category_img/document.svg'
import jewellry from '../../image/Category_img/ewellry.svg'
import Key from '../../image/Category_img/keys.svg'
import Watch from '../../image/Category_img/watch.svg'
import Other from '../../image/Category_img/other.svg'
import Person from '../../image/Category_img/persons.svg'
import Dog from "../../image/Category_img/dog-solid.svg"
import Clothes from "../../image/Category_img/shirt-solid.svg"
// import Om from "../../image/Category_img"
function Category() {
  const items = [
    { path: '/SubCategory', img: Mobile, label: 'Electronic' ,value:"electronics" },
    { path: '/SubCategory', img: Bags, label: 'Bag' ,value:"bags_accessories"},
    // { path: '/SubCategory', img: Key, label: 'Key' },
    // { path: '/SubCategory', img: Laptop, label: 'Laptop' },
    // { path: '/SubCategory', img: Watch, label: 'Watch' },
    // { path: '/SubCategory', img: jewellry, label: 'jewellry' },
    { path: '/SubCategory', img: Document, label: 'Document' ,value:"documents" },
    { path: '/SubCategory', img: Car, label: 'Vehicle' ,value:"vehicles_related"},
    { path: '/SubCategory', img: Person, label: 'Person' ,value:"personal_belongings"},
    { path: '/SubCategory', img: Other, label: 'Religious',value:"religious_items" },
    { path: '/SubCategory', img: Dog, label: 'Pet',value:"pets" },
    { path: '/SubCategory', img: Clothes, label: 'Clothes',value:"clothing_wearables" },
  ];

  useEffect(() => {
    AOS.init({ duration: 8000, once: true });
    AOS.refresh()
  }, []);
  return (
    <div data-aos="fade-up" data-aos-duration="2000">
      <h1 className='category_head'>Category</h1>
      <div className="category-container" >
        <ul className="category-grid">
          {items.map((item) => (
            <li className="category-item">
             <Link 
             to="/subcategory"
              state={{ 
                category: item.value.toLowerCase().replace(/\s+/g, "_") 
              }}
              >
                <img src={item.img} alt={item.label} className="category-img"  data-aos="flip-left" data-aos-duration="2000"/>
                <span className="category-label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>


    </div>

  )
}

export default Category