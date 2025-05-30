import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Typography, 
  Button, 
  Paper, 
  Grid,
  Box,
  TextField,
  Avatar,
  Divider,
  Tab,
  Tabs
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import LockIcon from '@mui/icons-material/Lock';

const Profile = () => {
  const navigate = useNavigate();
  const { user, updateUserProfile } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    bio: ''
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  useEffect(() => {
    // Simulando busca de dados do perfil
    // Em um caso real, aqui seria feita uma chamada à API
    setProfileData({
      name: user?.name || 'Usuário Teste',
      email: user?.email || 'usuario@teste.com',
      phone: '(11) 98765-4321',
      position: 'Gerente de RH',
      department: 'Recursos Humanos',
      bio: 'Profissional com mais de 10 anos de experiência em gestão de pessoas e recursos humanos.'
    });
  }, [user]);
  
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // Aqui seria feita a chamada à API para salvar os dados
    console.log('Dados do perfil:', profileData);
    
    // Atualizar o perfil do usuário no contexto
    updateUserProfile({
      ...user,
      name: profileData.name,
      email: profileData.email
    });
  };
  
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Aqui seria feita a chamada à API para alterar a senha
    console.log('Dados da senha:', passwordData);
    
    // Limpar os campos após o envio
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };
  
  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Meu Perfil
        </Typography>
      </Box>
      
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <Avatar 
            sx={{ 
              width: 100, 
              height: 100, 
              mr: 3,
              bgcolor: 'primary.main'
            }}
          >
            {profileData.name.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h5">
              {profileData.name}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {profileData.position} - {profileData.department}
            </Typography>
          </Box>
        </Box>
        
        <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="Informações Pessoais" />
          <Tab label="Alterar Senha" />
        </Tabs>
        
        <Divider sx={{ mb: 3 }} />
        
        {tabValue === 0 && (
          <Box component="form" onSubmit={handleProfileSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Nome Completo"
                  name="name"
                  value={profileData.name}
                  onChange={handleProfileChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Telefone"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Cargo"
                  name="position"
                  value={profileData.position}
                  onChange={handleProfileChange}
                  disabled
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Departamento"
                  name="department"
                  value={profileData.department}
                  onChange={handleProfileChange}
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Biografia"
                  name="bio"
                  value={profileData.bio}
                  onChange={handleProfileChange}
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="flex-end" mt={2}>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    type="submit"
                    startIcon={<SaveIcon />}
                  >
                    Salvar Alterações
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
        
        {tabValue === 1 && (
          <Box component="form" onSubmit={handlePasswordSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Senha Atual"
                  name="currentPassword"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Nova Senha"
                  name="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Confirmar Nova Senha"
                  name="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                  error={passwordData.newPassword !== passwordData.confirmPassword}
                  helperText={
                    passwordData.newPassword !== passwordData.confirmPassword
                      ? 'As senhas não coincidem'
                      : ''
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="flex-end" mt={2}>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    type="submit"
                    startIcon={<LockIcon />}
                    disabled={passwordData.newPassword !== passwordData.confirmPassword}
                  >
                    Alterar Senha
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>
    </div>
  );
};

export default Profile;
