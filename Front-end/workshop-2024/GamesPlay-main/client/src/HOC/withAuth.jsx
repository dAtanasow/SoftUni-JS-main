import { useAuthContext } from ".././contexts/AuthContext";

export default function withAuth(Component) {
  const EnhancedComponent = (props) => {
    const authContext = useAuthContext();
    return <Component {...props} auth={authContext} />;
  };
  return EnhancedComponent;
}
