// Navbar.js (continued)

const NavContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #e0ebf850;
`;

const LogoContainer = styled.TouchableOpacity`
  cursor: pointer;
`;

const Logo = styled.Image`
  height: 75px;
`;

const LinksContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

const NavLink = styled.Text`
  color: #1f3b64;
  font-weight: bold;
  font-size: 14px;
  margin-right: 20px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const LoginButton = styled.TouchableOpacity`
  padding: 10px 20px;
  background-color: #ffffffaa;
  border-radius: 5px;
  color: #1f3b64;
  cursor: pointer;
  font-weight: bold;
  font-size: 13px;
`;

const LogoutButton = styled.TouchableOpacity`
  padding: 10px 20px;
  background-color: #ffffffaa;
  border-radius: 5px;
  color: #1f3b64;
  cursor: pointer;
  font-weight: bold;
  font-size: 13px;
`;

const ButtonText = styled.Text`
  color: #1f3b64;
`;
