import React,{useEffect,useMemo,useState} from 'react';
import{createRoot}from'react-dom/client';
import {
  BrowserRouter,
  Link,
  NavLink,
  useNavigate,
  useParams,
  useSearchParams,
  useLocation,
  Routes as RouterRoutes,
  Route as RouterRoute
} from 'react-router-dom';
import{Bike,CalendarDays,Users,Fuel,Gauge,ArrowRight,MapPin,ShieldCheck,Clock3,Menu,X,MessageCircle,CheckCircle2,Search,SlidersHorizontal,ChevronRight,Star,Headphones,KeyRound,Route,PhoneCall,Check,AlertCircle}from'lucide-react';
import{business,bikes,money,waLink}from'./data';
import{getBookings,isCarAvailable,saveBooking}from'./booking';
import './style.css';

const today=()=>{const d=new Date();return`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
const formatDate=v=>v?new Date(v).toLocaleString('en-IN',{day:'numeric',month:'short',year:'numeric',hour:'numeric',minute:'2-digit'}):'';
const dtLocal=(date,hour='09:00')=>date?`${date}T${hour}`:'';
function Chat({label='Chat on WhatsApp',message='Hello, I would like to enquire about scooter and motorcycle rentals.',outline=false}){return <a className={outline?'btn btn-outline':'btn btn-green'} href={waLink(message)} target="_blank" rel="noreferrer"><MessageCircle size={18}/>{label}</a>}
function Header(){const[open,setOpen]=useState(false);const links=[['/','Home'],['/bikes','Find Bikes'],['/about','About Us'],['/terms','Rental Terms'],['/ourlocation','Our Location'],['/contact','Contact']];return <header className="site-header"><div className="nav-wrap container"><Link className="brand" to="/" onClick={()=>setOpen(false)}><span className="brand-icon"><Bike size={30}/></span><span><strong>{business.name}</strong><small>{business.subtitle}</small></span></Link><nav className={open?'nav-links open':'nav-links'}>{links.map(([to,label])=><NavLink onClick={()=>setOpen(false)} key={to} end={to==='/'} to={to} className={({isActive})=>isActive?'active':''}>{label}</NavLink>)}<span className="mobile-only"><Chat label="WhatsApp Enquiry"/></span></nav><div className="nav-action"><Chat/><button aria-label="Toggle navigation" className="menu-button" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div></div></header>}
function Footer(){return <footer className="footer"><div className="container footer-grid"><div><div className="footer-brand"><Bike/>{business.name}</div><p>Scooters, commuters and weekend motorcycles. Clear packages for every kind of ride.</p><Chat label="Enquire on WhatsApp"/></div><div><h4>Explore</h4><Link to="/bikes">Find Bikes</Link><Link to="/about">About Us</Link><Link to="/ourlocation">Our Location</Link></div><div><h4>Helpful links</h4><Link to="/terms">Rental Terms</Link><Link to="/contact">Contact</Link><Link to="/booking">Book a Bike</Link></div><div><h4>Location</h4><p><MapPin size={17}/>{business.location}</p><p>12-hour and 24-hour self-ride packages</p></div></div><div className="footer-bottom container"><span>© {new Date().getFullYear()} {business.name}. All rights reserved.</span><span>Ride with confidence.</span></div></footer>}
function Title({eyebrow,title,subtitle,light=false}){return <div className={light?'section-title light':'section-title'}>{eyebrow&&<div className="eyebrow">{eyebrow}</div>}<h2>{title}</h2>{subtitle&&<p>{subtitle}</p>}</div>}
function PriceGrid({car}) {
  return <div className="pricing-grid">
    <div className="price-col"><div className="price-heading">12 Hours</div><div className="price-line"><span>{car.km12} km included</span><b>{money(car.self.h12)}</b></div></div>
    <div className="price-col"><div className="price-heading">24 Hours</div><div className="price-line"><span>{car.km24} km included</span><b>{money(car.self.h24)}</b></div></div>
  </div>;
}
function CarCard({car,available=true,verified=true}) {
  return <div className="car-card glass">
    <div className="car-media"><img src={car.image} alt={`${car.name} illustrative rental image`} loading="lazy" onError={e=>{e.currentTarget.style.visibility='hidden'}}/>
      <span className={verified ? (available ? 'status available':'status booked') : 'status booked'}>{!verified?'Check availability':available?'Available':'Unavailable for dates'}</span>
    </div>
    <div className="car-info">
      <p className="vehicle-type">{car.type} · {car.variant}</p><h3>{car.name}</h3>
      <div className="specs"><span><Users size={15}/>{car.seats} riders</span><span><Fuel size={15}/>{car.fuel}</span><span><Gauge size={15}/>{car.transmission}</span></div>
      <PriceGrid car={car}/><p className="extra-line"><Clock3 size={15}/> Extra hour {money(car.extraHour)} · Extra km {money(car.extraKm)}</p>
      <div className="car-actions"><Link className="btn btn-primary" to={`/booking?car=${car.id}`}>Book Now <ArrowRight size={16}/></Link><Link className="btn btn-outline" to={`/bikes/${car.id}`}>View Details</Link></div>
    </div>
  </div>;
}
function SearchBox({compact=false}) {
  const navigate=useNavigate();
  const [date,setDate]=useState(today()),[type,setType]=useState('all'),[gear,setGear]=useState('all');
  return <form className={compact?'search-box glass compact':'search-box glass'} onSubmit={e=>{e.preventDefault();navigate(`/bikes?date=${date}&type=${encodeURIComponent(type)}&gear=${gear}`)}}>
    <label>Rental Date<input type="date" min={today()} value={date} onChange={e=>setDate(e.target.value)} required/></label>
    <label>Ride Category<select value={type} onChange={e=>setType(e.target.value)}><option value="all">All Categories</option>{[...new Set(bikes.map(b=>b.type))].map(t=><option key={t} value={t}>{t}</option>)}</select></label>
    <label>Transmission<select value={gear} onChange={e=>setGear(e.target.value)}><option value="all">Automatic or Geared</option><option value="Automatic">Automatic</option><option value="Manual">Geared</option></select></label>
    <button className="btn btn-primary" type="submit"><Search size={18}/> Find Bikes</button>
  </form>;
}
function Home(){return <>
 <section className="hero"><div className="hero-shine"/><div className="container hero-inner"><div className="hero-copy"><div className="hero-kicker"><span/> SCOOTERS • MOTORCYCLES • SELF-RIDE</div><h1>Your city. <em>Your ride.</em></h1><p>Explore easy-to-ride scooters, commuter bikes and powerful weekend motorcycles. Choose a variant, compare rental packages and book in a few steps.</p><div className="hero-buttons"><Link className="btn btn-white" to="/bikes">Explore Bikes <ArrowRight size={18}/></Link><Chat label="Ask on WhatsApp" outline/></div></div><div className="hero-search"><SearchBox/></div></div></section>
 <section className="benefits"><div className="container benefits-grid"><span><Bike/> Scooters & Motorcycles</span><span><CalendarDays/> 12 & 24 Hour Plans</span><span><KeyRound/> Automatic & Geared</span><span><ShieldCheck/> Transparent Pricing</span></div></section>
 <section className="section container"><div className="section-row"><Title eyebrow="THE FLEET" title="Pick your kind of ride" subtitle="Everyday scooters, quick commuters and bikes built for a longer ride."/><Link className="text-link" to="/bikes">See All Bikes <ArrowRight size={18}/></Link></div><div className="cards-grid">{bikes.slice(0,3).map(car=><CarCard key={car.id} car={car} verified={false}/>)}</div></section>
 <section className="section section-soft"><div className="container"><Title eyebrow="RENTING MADE SIMPLE" title="A simpler way to ride" subtitle="Choose the bike that matches your plans and get rental details without the back-and-forth."/><div className="features-grid"><Feature icon={<Search/>} title="Compare variants" copy="Explore scooters, geared bikes, transmission types and included kilometres."/><Feature icon={<CalendarDays/>} title="Choose dates" copy="Check your preferred 12-hour or 24-hour slot before sending a request."/><Feature icon={<MessageCircle/>} title="WhatsApp support" copy="Ask about pickup, licence, helmets and deposits directly."/></div></div></section>
 <section className="section container"><div className="promo glass"><div><span className="eyebrow">YOUR NEXT RIDE STARTS HERE</span><h2>Ready to take the scenic route?</h2><p>Choose a scooter for the city or a motorcycle for the highway.</p><Link className="btn btn-primary" to="/bikes">Find Your Ride <ArrowRight size={17}/></Link></div><div className="promo-icon"><Bike size={124} strokeWidth={1}/></div></div></section>
 </>}
function Feature({icon,title,copy}){return <div className="feature glass"><div className="feature-icon">{icon}</div><h3>{title}</h3><p>{copy}</p></div>}
function PageHero({tag,title,copy}){return <div className="page-hero"><div className="container"><p className="eyebrow">{tag}</p><h1>{title}</h1>{copy&&<p>{copy}</p>}</div></div>}
function Cars(){
 const [params,setParams]=useSearchParams();
 const [bookings,setBookings]=useState([]),[error,setError]=useState(''),[loaded,setLoaded]=useState(false);
 const date=params.get('date')||today(),type=params.get('type')||'all',gear=params.get('gear')||'all';
 const [duration,setDuration]=useState('12');
 const start=dtLocal(date),startIso=new Date(start).toISOString(),end=new Date(new Date(start).getTime()+Number(duration)*3600000).toISOString();
 useEffect(()=>{getBookings().then(b=>{setBookings(b);setLoaded(true)}).catch(e=>setError(e.message))},[]);
 const filtered=bikes.filter(b=>(type==='all'||b.type===type)&&(gear==='all'||b.transmission===gear));
 const setFilter=(key,value)=>setParams(prev=>{const next=new URLSearchParams(prev);next.set(key,value);return next});
 return <><PageHero tag="EXPLORE THE FLEET" title="Find your ideal bike" copy="Pick a scooter or motorcycle. Compare variants, packages and rental dates."/>
 <section className="section container">
  <div className="listing-filter glass">
    <div><label>Rental date<input type="date" min={today()} value={date} onChange={e=>setFilter('date',e.target.value)}/></label></div>
    <div><label>Category<select value={type} onChange={e=>setFilter('type',e.target.value)}><option value="all">All categories</option>{[...new Set(bikes.map(b=>b.type))].map(t=><option key={t} value={t}>{t}</option>)}</select></label></div>
    <div><label>Transmission<select value={gear} onChange={e=>setFilter('gear',e.target.value)}><option value="all">All transmissions</option><option value="Automatic">Automatic</option><option value="Manual">Geared</option></select></label></div>
    <div><label>Duration<select value={duration} onChange={e=>setDuration(e.target.value)}><option value="12">12 hours</option><option value="24">24 hours</option></select></label></div>
  </div>
  <div className="results-title"><h2>{filtered.length} bikes to explore</h2><p>Availability checks start at 9:00 AM. Choose your exact time when booking.</p></div>
  {error&&<div className="notice danger"><AlertCircle size={18}/>{error} Availability cannot be verified right now.</div>}
  <div className="cards-grid">{filtered.map(c=><CarCard key={c.id} car={c} verified={loaded&&!error} available={loaded&&!error&&isCarAvailable(bookings,c.id,startIso,end)}/>)}</div>
  {filtered.length===0&&<div className="notice">No bikes match those filters. Try another category.</div>}
 </section></>;
}
function CarDetails(){
 const {id}=useParams(),car=bikes.find(x=>x.id===id);
 if(!car)return <NotFound/>;
 return <><PageHero tag="RIDE DETAILS" title={car.name} copy={`${car.type} · ${car.variant} · ${car.transmission}`}/>
  <section className="section container detail-layout">
    <div><div className="detail-image glass"><img src={car.image} alt={`${car.name} representative photo`}/></div>
     <div className="glass detail-panel"><h2>Your ride, your route</h2><p>{car.description}</p><div className="detail-specs"><span><Users/>{car.seats} riders</span><span><Fuel/>{car.fuel}</span><span><Gauge/>{car.transmission}</span><span><Bike/>{car.variant}</span></div></div>
    </div>
    <aside className="glass detail-aside"><p className="eyebrow">CLEAR PACKAGE PRICING</p><h2>Choose your rental</h2><PriceGrid car={car}/>
      <div className="charges"><p><Clock3 size={18}/> Extra hour <strong>{money(car.extraHour)}/hour</strong></p><p><Route size={18}/> Extra kilometre <strong>{money(car.extraKm)}/km</strong></p></div>
      <p className="mini-note">12 hours includes {car.km12} km; 24 hours includes {car.km24} km. Bring a valid driving licence, ID and confirm helmet, deposit and fuel policies with the rental provider.</p>
      <Link className="btn btn-primary btn-full" to={`/booking?car=${car.id}`}>Check Dates & Book <ArrowRight size={17}/></Link>
      <Chat label="Ask about this bike" outline message={`Hello, I would like to know more about the ${car.name} rental.`}/>
    </aside>
  </section></>;
}
function Booking(){
 const [params]=useSearchParams(),navigate=useNavigate();
 const [carId,setCarId]=useState(params.get('car')||bikes[0].id),[pack,setPack]=useState('12'),[date,setDate]=useState(today()),[time,setTime]=useState('09:00');
 const [name,setName]=useState(''),[phone,setPhone]=useState(''),[bookings,setBookings]=useState([]),[verified,setVerified]=useState(false),[loading,setLoading]=useState(false),[error,setError]=useState(''),[done,setDone]=useState(false);
 const car=bikes.find(b=>b.id===carId)||bikes[0];
 const start=dtLocal(date,time),startDate=new Date(start),startIso=startDate.toISOString(),end=new Date(startDate.getTime()+Number(pack)*3600000).toISOString();
 const available=verified&&isCarAvailable(bookings,carId,startIso,end);
 const price=car.self[pack==='12'?'h12':'h24'];
 const message=`Hello, I would like to book a bike.\nBike: ${car.name}\nVariant: ${car.variant}\nPackage: ${pack} hours (${pack==='12'?car.km12:car.km24} km)\nRental start: ${formatDate(startIso)}\nRental end: ${formatDate(end)}\nPackage price: ${money(price)}\nName: ${name}\nContact: ${phone}`;
 useEffect(()=>{getBookings().then(b=>{setBookings(b);setVerified(true)}).catch(e=>{setVerified(false);setError(e.message)})},[]);
 async function submit(e){e.preventDefault();if(startDate<=new Date()){setError('Choose a future rental date and time.');return}if(!available){setError('This bike is unavailable or availability has not been verified.');return}
  setLoading(true);setError('');try{await saveBooking({carId,name:name.trim(),phone:phone.trim(),rentalType:'self',packageType:Number(pack),startAt:startIso,endAt:end});setDone(true);window.open(waLink(message),'_blank','noopener,noreferrer')}catch(err){setError(err.message);getBookings().then(setBookings).catch(()=>{})}finally{setLoading(false)}
 }
 return <><PageHero tag="BOOK YOUR RIDE" title="Reserve your bike" copy="Choose your scooter or motorcycle, rental package and start time."/>
  <section className="section container booking-layout"><div className="glass booking-form"><h2>Rental details</h2>
   {done?<div className="success-box"><CheckCircle2 size={44}/><h3>Request recorded</h3><p>Your rental details are ready for WhatsApp. Booking is subject to confirmation by the rental provider.</p><Chat label="Open WhatsApp" message={message}/><button className="btn btn-outline" onClick={()=>navigate('/bikes')}>Explore other bikes</button></div>:
   <form onSubmit={submit}><div className="form-row"><label>Choose bike<select value={carId} onChange={e=>setCarId(e.target.value)}>{bikes.map(b=><option value={b.id} key={b.id}>{b.name} · {b.variant}</option>)}</select></label><label>Package<select value={pack} onChange={e=>setPack(e.target.value)}><option value="12">12 hours · {car.km12} km</option><option value="24">24 hours · {car.km24} km</option></select></label></div>
    <div className="form-row"><label>Start date<input type="date" min={today()} required value={date} onChange={e=>setDate(e.target.value)}/></label><label>Start time<input type="time" required value={time} onChange={e=>setTime(e.target.value)}/></label></div>
    <div className="form-row"><label>Your name<input type="text" required minLength={2} maxLength={100} placeholder="Enter your name" value={name} onChange={e=>setName(e.target.value)}/></label><label>WhatsApp / contact number<input type="tel" required minLength={8} maxLength={17} placeholder="Your contact number" value={phone} onChange={e=>setPhone(e.target.value)}/></label></div>
    <div className={available?'availability-message':'availability-message unavailable'}>{!verified?<><AlertCircle size={18}/> Checking availability...</>:available?<><CheckCircle2 size={18}/> Available for selected dates</>:<><AlertCircle size={18}/> Not available at this time</>}</div>
    {error&&<div className="notice danger"><AlertCircle size={18}/>{error}</div>}
    <button className="btn btn-primary btn-full" type="submit" disabled={!available||loading}>{loading?'Recording request...':'Reserve & Continue to WhatsApp'} <ArrowRight size={17}/></button>
    <p className="mini-note">Demo mode stores bookings in your browser only. Live customer availability requires a shared database and spam prevention.</p>
   </form>}</div>
   <aside className="booking-summary glass"><img src={car.image} alt={car.name}/><div className="summary-content"><p className="eyebrow">YOUR SELECTION</p><h3>{car.name}</h3><p>{car.variant} · {pack} hours</p>
    <div className="summary-item"><span>Included distance</span><strong>{pack==='12'?car.km12:car.km24} km</strong></div>
    <div className="summary-item"><span>Extra hour</span><strong>{money(car.extraHour)}/hour</strong></div><div className="summary-item"><span>Extra kilometre</span><strong>{money(car.extraKm)}/km</strong></div>
    <div className="summary-item"><span>Rental begins</span><strong>{formatDate(startIso)}</strong></div><div className="summary-total"><span>Package price</span><strong>{money(price)}</strong></div>
    <p className="mini-note">Helmet, fuel, deposits and applicable taxes must be confirmed with the rental business.</p></div></aside>
  </section></>;
}
function About(){return <><PageHero tag="ABOUT US" title="Two wheels. More freedom." copy="Straightforward scooter and motorcycle rentals for everyday rides and travel."/><section className="section container about-grid"><div><Title eyebrow="OUR APPROACH" title="Simple choices, clear terms"/><p>At {business.name}, browse by bike type, variant, and rental duration. Review the included kilometres and extra charges before sending a booking request.</p><p>Choose a comfortable automatic scooter or a geared motorcycle suited to your route. Our team can help with ride details, document requirements, helmets and pickup information.</p><Link className="btn btn-primary" to="/bikes">Explore Our Fleet <ArrowRight size={16}/></Link></div><div className="about-photo glass"/></section><section className="section section-soft"><div className="container features-grid"><Feature icon={<ShieldCheck/>} title="Clear rental terms" copy="Know the distance allowance and additional usage costs in advance."/><Feature icon={<Bike/>} title="Different ride styles" copy="Pick from scooters, commuter bikes, street bikes and cruisers."/><Feature icon={<Headphones/>} title="Direct support" copy="Send a quick enquiry through WhatsApp."/></div></section></>}
function Terms(){const terms=[
 ['Booking and availability','Availability depends on the selected bike, rental date and start time. A request is subject to rental-provider confirmation.'],
 ['Rental duration','Choose a 12-hour or 24-hour rental package. The rental clock begins at the selected start time.'],
 ['Included distance','Kilometres included in each rental package are shown on the bike card and booking summary.'],
 ['Additional usage','Extra hours and kilometres are charged at the bike-specific displayed rates. Both fees may apply.'],
 ['Rider requirements','Riders must have a valid driving licence suitable for the selected two-wheeler and comply with applicable age and road safety requirements.'],
 ['Helmets and safety','Ask the rental business about included helmets, passenger helmets, damage policies, and any riding gear. Wear a helmet while riding.'],
 ['Fuel, tolls and parking','Confirm fuel arrangements, tolls, parking and other expenses before taking the bike.'],
 ['Changes and cancellations','Contact the rental team to confirm cancellation, refund, and schedule-change policies.'],
 ['Bike handover','Identification, deposits, security checks, vehicle inspection and handover conditions depend on the rental provider.']
 ];return <><PageHero tag="RENTAL INFORMATION" title="Rental terms" copy="Everything to clarify before you ride."/><section className="section container terms-layout"><div className="glass terms-card">{terms.map(([title,body],i)=><div key={title} className="term"><span className="term-number">{String(i+1).padStart(2,'0')}</span><div><h3>{title}</h3><p>{body}</p></div></div>)}</div><div className="terms-side glass"><h3>Questions before you ride?</h3><p>Ask the team about licences, helmets, deposits, mileage and pickup.</p><Chat label="Ask on WhatsApp"/></div></section></>}
function Reviews() {
  return (
    <>
      <PageHero
        tag="FIND US"
        title="Visit Us on Google Maps"
        copy="Find our rental location and get directions."
      />

      <section className="section container">
        <div className="reviews-panel glass">
          <h2>Our Business Location</h2>
          <p>{business.location}</p>

          <a
            href={business.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              width: "100%",
              marginTop: "24px"
            }}
          >
            <iframe
              title="Business Location"
              src={business.googleMapsEmbedUrl}
              width="100%"
              height="350"
              style={{
                border: 0,
                borderRadius: "12px",
                pointerEvents: "none"
              }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </a>

          <a
            className="btn btn-primary"
            href={business.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginTop: "20px" }}
          >
            Open in Google Maps <ArrowRight size={17} />
          </a>
        </div>
      </section>
    </>
  );
}
function Contact(){return <><PageHero tag="GET IN TOUCH" title="We're here to help" copy="Have a question about a bike, package or upcoming journey? Reach us directly."/><section className="section container contact-grid"><div className="contact-card glass"><div className="feature-icon"><MessageCircle/></div><h2>WhatsApp support</h2><p>Get assistance with bike selection, packages, availability and rental conditions.</p><Chat label="Message on WhatsApp"/></div><div className="contact-card glass"><div className="feature-icon"><MapPin/></div><h2>Our business location</h2><p>{business.location}</p>{business.googleMapsUrl&&<a className="btn btn-outline" target="_blank" rel="noreferrer" href={business.googleMapsUrl}>View Business Location <ArrowRight size={17}/></a>}<div className="location-surface"><MapPin size={42}/><span>Business location</span></div></div></section></>}
function NotFound(){return <div className="section container missing"><h1>Page not found</h1><p>We couldn't find that page.</p><Link to="/" className="btn btn-primary">Back to Home</Link></div>}
function Pages() {
  return (
    <RouterRoutes>
      <RouterRoute path="/" element={<Home />} />
      <RouterRoute path="/bikes" element={<Cars />} />
      <RouterRoute path="/bikes/:id" element={<CarDetails />} />
      <RouterRoute path="/booking" element={<Booking />} />
      <RouterRoute path="/about" element={<About />} />
      <RouterRoute path="/terms" element={<Terms />} />
      <RouterRoute path="/ourlocation" element={<Reviews />} />
      <RouterRoute path="/contact" element={<Contact />} />
      <RouterRoute path="*" element={<NotFound />} />
    </RouterRoutes>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


function Root() {
  return (
    <BrowserRouter
  future={{
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  }}
>
      <ScrollToTop />
      <Header />
      <main>
        <Pages />
      </main>
      <Footer />
      <a
        className="floating-wa"
        href={waLink('Hello, I would like to enquire about renting a bike.')}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={24} />
      </a>
    </BrowserRouter>
  );
}
createRoot(document.getElementById('root')).render(<Root/>);
