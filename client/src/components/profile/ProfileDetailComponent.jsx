import React from 'react'

export default function ProfileDetailComponent() {
  return (
    <div className='row border mt-4 p-4'>
        <div className="col-4">
            <img className='mb-3' src='https://cdn-icons-png.flaticon.com/128/3135/3135715.png'  alt=''/>
            <p className="m-0 p-0" style={{fontSize:"12px",fontWeight:400}}>Name : Jack Daniel</p>
            <p className="m-0 p-0" style={{fontSize:"12px",fontWeight:400}}>Title : Sr. Full Stack </p>
            <p className="m-0 p-0" style={{fontSize:"12px",fontWeight:400}}>Score :  16253</p>
        </div>
        <div className="col p-0">
            <p className='p-0 m-0' style={{fontSize:"16px",fontWeight:600,wordWrap:true}}>Bio</p>
            <hr/>
            <p style={{fontSize:"12px",fontWeight:400}}>
                2018 yılında, kendi yazılım şirketini kurdu. Şirketi, e-ticaret, pazarlama ve CRM gibi alanlarda yazılımlar geliştiriyor.
                İdil, Java, Python, JavaScript ve PHP gibi çeşitli programlama dillerinde uzmanlaşmıştır. Ayrıca, web tasarımı ve geliştirme konusunda da deneyimlidir.
                İdil, yeni teknolojilere ve öğrenmeye açık bir kişidir. Sürekli olarak yeni teknolojileri takip ediyor ve kendini geliştirmeye çalışıyor.
                İdil, yazılım alanındaki deneyimini ve bilgi birikimini kullanarak, müşterilerinin ihtiyaçlarına uygun yazılımlar geliştirmeye çalışıyor.</p>
        </div>
    </div>
  )
}
