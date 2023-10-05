import React from 'react'
import LoginAdmin from '../../components/admin/LoginAdmin';
import Footer from '../../components/footer/Footer';

function AdminLoginPage() {
  return (
    <div>
       <div className='admin-div'></div>
            <LoginAdmin />
        <div className='admin-footer'></div>
    </div>
  )
}

export default AdminLoginPage;