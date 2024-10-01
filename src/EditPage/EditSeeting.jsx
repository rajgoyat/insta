// import Layout from './Layout';
import { useMediaQuery } from 'react-responsive';
import {Meta,Account,Privacy,Person,Help,Family,Mute,Content,Archiving,Dislike,Language, Security,Website, Add, Payment, Profile, Notification, Shop, Graph, Lock,Star, Block, Hide, Message, Tag, Comment, Share, Restricted, Word} from './EditProSvg'
export default function EditSeeting(){
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
    return(
        <>
       
        <div className='main_edit bg- d-flex position-relative'>
<div className='Setting bg-  ' style={{minWidth:isMobile?"100vw":"332px",padding:" 21px",height:"100vh"}}>
<div className='d-flex flex-column gap-3 position-fixed scroll-container' style={{height:"100vh",minWidth:isMobile?"100vw":""}}>
<div style={{fontWeight:"700",fontSize:"20px",color:"#00000"}} className='ms-3 py-1 '>Settings</div>

<div style={{width:"267px",aspectRatio:"1",padding:"20px",borderRadius:"14px",boxShadow:"0 0 24px 0 rgba(0,0,0,0.08)"}} className='d-flex Settingg cr flex-column justify-content-between' >
    <Meta/>
    <span style={{fontSize:"16px",fontWeight:"700",color:"#000000"}}>Accounts Centre</span>
    <span style={{fontWeight:"400",fontSize:"12px",color:"#737373"}}>Manage your connected experiences and account setting across Meta technologies.</span>
    
    <span style={{fontSize:"12px",color:"#737373",fontWeight:"400"}} className='w-100 d-flex gap-2'>
        <Person/>
       <span className='d-flex justify-content-center h-100'> Personal details</span>
    </span>
    <span style={{fontSize:"12px",color:"#737373",fontWeight:"400"}} className='w-100 d-flex gap-2'>
        <Security/>
       <span className='d-flex justify-content-center'> Password and security</span>
    </span>
    <span style={{fontSize:"12px",color:"#737373",fontWeight:"400"}} className='w-100 d-flex gap-2'>
        <Add/>
       <span className='d-flex justify-content-center h-100'> Ad preferences</span>
    </span>
    <span style={{fontSize:"12px",color:"#737373",fontWeight:"400"}} className='w-100 d-flex gap-2'>
        <Payment/>
       <span className='d-flex justify-content-center'> Payments</span>
    </span>
    <span style={{fontWeight:"600",fontSize:"12px",color:"#0095f6"}}>See more in Accounts centre</span>
</div>

<div className='d-flex flex-column '>
<span style={{fontSize:"12px",color:"#737373",fontWeight:"600",padding:"12px 16px"}}>How you use Instagram</span>
<div className='d-flex gap-2 Setting_btn cr' style={{padding:"12px 16px",borderRadius:"8px"}}>
    <Profile/>
<span style={{color:"#000000",fontWeight:"400",fontSize:"14px"}}>Edit profile</span>
</div>
<div className='d-flex gap-2 Setting_btn cr' style={{padding:"12px 16px",borderRadius:"8px"}}>
    <Notification/>
<span style={{color:"#000000",fontWeight:"400",fontSize:"14px"}}>Notification</span>
</div>
<span style={{fontSize:"12px",color:"#737373",fontWeight:"600",padding:"12px 16px"}}>How you use Instagram</span>
<div className='d-flex gap-2 Setting_btn cr' style={{padding:"12px 16px",borderRadius:"8px"}}>
    <Shop/>
<span style={{color:"#000000",fontWeight:"400",fontSize:"14px"}}>Professional account</span>
</div>
<div className='d-flex gap-2 Setting_btn cr' style={{padding:"12px 16px",borderRadius:"8px"}}>
    <Graph/>
<span style={{color:"#000000",fontWeight:"400",fontSize:"14px"}}>Creator tools and controls</span>
</div>
<span style={{fontSize:"12px",color:"#737373",fontWeight:"600",padding:"12px 16px"}}>Who can see your content</span>
<div className='d-flex gap-2 Setting_btn cr' style={{padding:"12px 16px",borderRadius:"8px"}}>
    <Lock/>
<span style={{color:"#000000",fontWeight:"400",fontSize:"14px"}}>Account privacy</span>
</div>
<div className='d-flex gap-2 Setting_btn cr' style={{padding:"12px 16px",borderRadius:"8px"}}>
    <Star/>
<span style={{color:"#000000",fontWeight:"400",fontSize:"14px"}}>Close friends</span>
</div>
<div className='d-flex gap-2 Setting_btn cr' style={{padding:"12px 16px",borderRadius:"8px"}}>
    <Block/>
<span style={{color:"#000000",fontWeight:"400",fontSize:"14px"}}>Blocked</span>
</div>
<div className='d-flex gap-2 Setting_btn cr' style={{padding:"12px 16px",borderRadius:"8px"}}>
    <Hide/>
<span style={{color:"#000000",fontWeight:"400",fontSize:"14px"}}>Hide story and Live</span>
</div>
<span style={{fontSize:"12px",color:"#737373",fontWeight:"600",padding:"12px 16px"}}>How others can interact with you</span>
<div className='d-flex gap-2 Setting_btn cr' style={{padding:"12px 16px",borderRadius:"8px"}}>
    <Message/>
<span style={{color:"#000000",fontWeight:"400",fontSize:"14px"}}>Meassages and story replies</span>
</div>
<div className='d-flex gap-2 Setting_btn cr' style={{padding:"12px 16px",borderRadius:"8px"}}>
    <Tag/>
<span style={{color:"#000000",fontWeight:"400",fontSize:"14px"}}>Tags and mentions</span>
</div>
<div className='d-flex gap-2 Setting_btn cr' style={{padding:"12px 16px",borderRadius:"8px"}}>
    <Comment/>
<span style={{color:"#000000",fontWeight:"400",fontSize:"14px"}}>Comments</span>
</div>
<div className='d-flex gap-2 Setting_btn cr' style={{padding:"12px 16px",borderRadius:"8px"}}>
    <Share/>
<span style={{color:"#000000",fontWeight:"400",fontSize:"14px"}}>Sharing and remixes</span>
</div>
<div className='d-flex gap-2 Setting_btn cr' style={{padding:"12px 16px",borderRadius:"8px"}}>
    <Restricted/>
<span style={{color:"#000000",fontWeight:"400",fontSize:"14px"}}>Restricted accounts</span>
</div>
<div className='d-flex gap-2 Setting_btn cr' style={{padding:"12px 16px",borderRadius:"8px"}}>
    <Word/>
<span style={{color:"#000000",fontWeight:"400",fontSize:"14px"}}>Hidden words</span>
</div>
<span style={{fontSize:"12px",color:"#737373",fontWeight:"600",padding:"12px 16px"}}>What you see</span>
<div className='d-flex gap-2 Setting_btn cr' style={{padding:"12px 16px",borderRadius:"8px"}}>
    <Mute/>
<span style={{color:"#000000",fontWeight:"400",fontSize:"14px"}}>Mutted accounts</span>
</div>
<div className='d-flex gap-2 Setting_btn cr' style={{padding:"12px 16px",borderRadius:"8px"}}>
    <Content/>
<span style={{color:"#000000",fontWeight:"400",fontSize:"14px"}}>Content preferences</span>
</div>
<div className='d-flex gap-2 Setting_btn cr' style={{padding:"12px 16px",borderRadius:"8px"}}>
    <Dislike/>
<span style={{color:"#000000",fontWeight:"400",fontSize:"14px"}}>Like and share counts</span>
</div>
<span style={{fontSize:"12px",color:"#737373",fontWeight:"600",padding:"12px 16px"}}>Your app and media</span>
<div className='d-flex gap-2 Setting_btn cr' style={{padding:"12px 16px",borderRadius:"8px"}}>
    <Archiving/>
<span style={{color:"#000000",fontWeight:"400",fontSize:"14px"}}>Archiving and downloading</span>
</div>
<div className='d-flex gap-2 Setting_btn cr' style={{padding:"12px 16px",borderRadius:"8px"}}>
    <Language/>
<span style={{color:"#000000",fontWeight:"400",fontSize:"14px"}}>Language</span>
</div>
<div className='d-flex gap-2 Setting_btn cr' style={{padding:"12px 16px",borderRadius:"8px"}}>
    <Website/>
<span style={{color:"#000000",fontWeight:"400",fontSize:"14px"}}>Website permssions</span>
</div>
<span style={{fontSize:"12px",color:"#737373",fontWeight:"600",padding:"12px 16px"}}>For families</span>
<div className='d-flex gap-2 Setting_btn cr' style={{padding:"12px 16px",borderRadius:"8px"}}>
    <Family/>
<span style={{color:"#000000",fontWeight:"400",fontSize:"14px"}}>Family centre</span>
</div>
<span style={{fontSize:"12px",color:"#737373",fontWeight:"600",padding:"12px 16px"}}>More info and support</span>
<div className='d-flex gap-2 Setting_btn cr' style={{padding:"12px 16px",borderRadius:"8px"}}>
    <Help/>
<span style={{color:"#000000",fontWeight:"400",fontSize:"14px"}}>Help</span>
</div>
<div className='d-flex gap-2 Setting_btn cr' style={{padding:"12px 16px",borderRadius:"8px"}}>
    <Privacy/>
<span style={{color:"#000000",fontWeight:"400",fontSize:"14px"}}>Privacy center</span>
</div>
<div className='d-flex gap-2 Setting_btn cr' style={{padding:"12px 16px",borderRadius:"8px"}}>
    <Account/>
<span style={{color:"#000000",fontWeight:"400",fontSize:"14px"}}>Account status</span>
</div>
<div style={{height:"20px"}}>vmfh,</div>


</div>

</div>
</div>
{/* <div style={{padding:"36px 0px",flexGrow:"1",height:"100vh"}} className='scroll-container'><EditProfile2/></div> */}

        </div>
        
        </>
    )
}