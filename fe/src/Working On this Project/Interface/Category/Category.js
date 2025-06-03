import React from 'react'
import './Category.css'
import { Card } from 'antd'
import { Link } from 'react-router-dom';
import Mobile from '../Category/mobiles.svg'
import Bags from '../Category/bags.svg'
import Laptop from '../Category/laptops.svg'
import Car from '../Category/cars.svg'
import Document from '../Category/document.svg'
import jewellry from '../Category/ewellry.svg'
import Key from '../Category/keys.svg'
import Watch from '../Category/watch.svg'
import Other from '../Category/other.svg'
import Person from '../Category/persons.svg'

import User from '../Category/user.svg'
import Reporting from '../Category/reporting.svg'
import Correct from '../Category/correct.svg'
function Category() {
  const items = [
    { path: '/Mobile', img: Mobile, label: 'Mobile' },
    { path: '/Bags', img: Bags, label: 'Bag' },
    { path: '/Key', img: Key, label: 'Key' },
    { path: '/Laptop', img: Laptop, label: 'Laptop' },
    { path: '/Watch', img: Watch, label: 'Watch' },
    { path: '/gewellry', img: jewellry, label: 'jewellry' },
    { path: '/Document', img: Document, label: 'Document' },
    { path: '/Car', img: Car, label: 'Car' },
    { path: '/Person', img: Person, label: 'Person' },
    { path: '/Other', img: Other, label: 'Other' },
  ];

  return (
    <div>
      <div className="category-container">
        <ul className="category-grid">
          {items.map((item) => (
            <li className="category-item">
              <Link to={item.path} >
                <img src={item.img} alt={item.label} className="category-img" />
                <span className="category-label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

       <h1 className='home_h1'>How to post the Ad ?</h1>
      <div className='second_div'>
        <Card className='home_box'>
          <img src={User} className='home_img1'></img>
          <h2>Step 1: Register with us</h2>
          <p className='home_para'>Don't know how to deal with lost or found items near you? Register with your name and email address. If you have registered already, you can use the same account for posting unlimited ads.</p>
        </Card>
        <Card className='home_box'>
          <img src={Correct} className='home_img1' ></img>
          <h2>Step 2: Verify your account</h2>
          <p className='home_para'>Confirm your registration through the verification link which has sent to the given email address and then you can manage the account details now. Use either username or email address for login to your account.</p>
        </Card>
        <Card className='home_boxs'>
          <img src={Reporting} className='home_img2'></img>
          <h2>Step 3: Start reporting</h2>
          <p className='home_para'>You can start creating the ad for the lost or found items now to claim the item or hand over it to the rightful owner. Once done, we will post the ad on the large community where everybody can potentially take action in searching for what you have lost.</p>
        </Card>
      </div>
    </div>

  )
}

export default Category