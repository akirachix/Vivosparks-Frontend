import Sidebar from "./components/Sidebar";

export default function Home() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
      </div>
    </div>
  );
}
