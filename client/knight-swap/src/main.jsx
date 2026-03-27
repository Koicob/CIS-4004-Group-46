import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import UserPosts from './Pages/userPosts.jsx'
import AddItem from './Pages/addItem.jsx'
import Offers from './Pages/offers.jsx'

let theRoot = createRoot(document.getElementById('root'));

export function LoginPage() {
  theRoot.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

export function HomePage() {
theRoot.render(
  <StrictMode>
    <>
    <App />
    </>
  </StrictMode>,
)
}

export function AddItemPage() {
theRoot.render(
  <StrictMode>
    <>
    <AddItem />
    </>
  </StrictMode>,
)
}

export function UserPostsPage() {
theRoot.render(
  <StrictMode>
    <>
    <UserPosts />
    </>
  </StrictMode>,
)
}

export function OffersPage() {
theRoot.render(
  <StrictMode>
    <>
    <Offers />
    </>
  </StrictMode>,
)
}

LoginPage();