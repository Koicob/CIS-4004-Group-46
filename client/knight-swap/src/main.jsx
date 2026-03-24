import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import Menu from './menu.jsx'
import UserPosts from './userPosts.jsx'
import AddItem from './addItem.jsx'
import Offers from './offers.jsx'

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
    <Menu />
    <App />
    </>
  </StrictMode>,
)
}

export function AddItemPage() {
theRoot.render(
  <StrictMode>
    <>
    <Menu />
    <AddItem />
    </>
  </StrictMode>,
)
}

export function UserPostsPage() {
theRoot.render(
  <StrictMode>
    <>
    <Menu />
    <UserPosts />
    </>
  </StrictMode>,
)
}

export function OffersPage() {
theRoot.render(
  <StrictMode>
    <>
    <Menu />
    <Offers />
    </>
  </StrictMode>,
)
}

LoginPage();