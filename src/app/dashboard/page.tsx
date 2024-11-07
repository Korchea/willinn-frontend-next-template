"use client";

import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  // Estados para gestionar usuarios, campos de formulario y búsqueda
  const [users, setUsers] = useState([]); // Lista de usuarios
  const [searchId, setSearchId] = useState(''); // ID para búsqueda
  const [isActive, setIsActive] = useState(false); // Estado de usuario activo
  const [name, setName] = useState(''); // Nombre del usuario
  const [surname, setSurname] = useState(''); // Apellido del usuario
  const [email, setEmail] = useState(''); // Correo electrónico del usuario
  const [password, setPassword] = useState(''); // Contraseña del usuario
  const [editingUserId, setEditingUserId] = useState(null); // ID de usuario en edición

  // Buscar usuario por ID cuando se presiona Enter
  const handleSearch = async (event) => {
    if (event.key === 'Enter' && searchId) {
      try {
        const response = await fetch(`https://localhost:44369/api/Users/${searchId}`);
        if (response.ok) {
          const user = await response.json();
          setUsers([user]); // Mostrar solo el usuario encontrado
        } else {
          setUsers([]); // Limpiar si no se encuentra el usuario
        }
      } catch (error) {
        console.error('Error al buscar usuario:', error);
      }
    }
  };

  // Crear un nuevo usuario
  const handleCreateUser = async () => {
    const fullName = `${name} ${surname}`;
    try {
      const response = await fetch('https://localhost:44369/api/Users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: fullName, email, password, isActive }),
      });

      if (response.ok) {
        // Limpiar campos y actualizar la lista de usuarios
        resetFormFields();
        await fetchUsers(); // Recargar la lista de usuarios
      }
    } catch (error) {
      console.error('Error al crear usuario:', error);
    }
  };

  // Actualizar un usuario existente
  const updateUser = async () => {
    const fullName = `${name} ${surname}`;
    try {
      const response = await fetch(`https://localhost:44369/api/Users/${editingUserId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: fullName, email, password, isActive }),
      });

      if (response.ok) {
        await fetchUsers(); // Recargar la lista de usuarios
        resetFormFields(); // Limpiar el formulario
      }
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
    }
  };

  // Preparar formulario para editar usuario
  const handleEditUser = (user) => {
    setEditingUserId(user.id);
    const [firstName, lastName] = user.name.split(' ');
    setName(firstName || '');
    setSurname(lastName || '');
    setEmail(user.email);
    setPassword('');
    setIsActive(user.isActive);
  };

  // Cargar la lista inicial de usuarios
  const fetchUsers = async () => {
    try {
      const response = await fetch('https://localhost:44369/api/Users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Eliminar usuario por ID
  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`https://localhost:44369/api/Users/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUsers(users.filter(user => user.id !== userId)); // Eliminar usuario de la lista
      } else {
        console.error('Error al eliminar usuario:', response.statusText);
      }
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  // Función para limpiar campos del formulario
  const resetFormFields = () => {
    setName('');
    setSurname('');
    setEmail('');
    setPassword('');
    setIsActive(false);
    setEditingUserId(null);
  };

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-white text-black p-4 flex flex-col">
        <img src="/WillinnLogo2.svg" alt="Logo" className="mb-8 w-20 h-20 mx-auto" />
        <div className="mt-4">
          <div className="flex items-center mb-2 text-gray-700">
            <img src="/Vector.svg" alt="Inicio" className="mr-2" />
            <span style={{ color: "rgba(206, 205, 205, 1)" }}>Inicio</span>
          </div>
          <div className="flex items-center mb-2">
            <img src="/people.svg" alt="Usuarios" className="mr-2" />
            <span style={{ color: "rgba(247, 39, 147, 1)" }}>Usuarios</span>
          </div>
        </div>
      </aside>

      <main className="flex-grow p-6 bg-gray-100 text-gray-800">
        <h1 className="text-2xl font-bold mb-6 ml-6">Usuarios</h1>

        <div className="flex space-x-6 w-full max-w-6xl ml-6">
          <section className="w-2/3 bg-white rounded shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Usuarios</h2>
              <div className="relative">
                <img src="/search.svg" alt="Buscar" className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  onKeyDown={handleSearch}
                  className="border p-2 pr-8 rounded text-gray-700 w-full"
                />
              </div>
            </div>

            <div className="overflow-y-auto max-h-96 custom-scrollbar">
              <table className="w-full bg-white rounded shadow">
                <thead>
                  <tr>
                    <th className="p-4 text-left border-b">Nombre</th>
                    <th className="p-4 text-left border-b">Correo</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="p-4 border-b">{user.name}</td>
                      <td className="p-4 border-b">{user.email}</td>
                      <td className="p-4 border-b">
                        <div className="relative group">
                          <div className="group-hover:hidden">
                            <img src="/three-dots.svg" alt="Más opciones" className="w-5 h-5" />
                          </div>
                          <div className="absolute top-1/2 left-0 hidden group-hover:flex space-x-2 transform -translate-y-1/2">
                            <button onClick={() => handleDeleteUser(user.id)} className="text-red-600 hover:text-red-800">
                              <img src="/trash.svg" alt="Eliminar" className="w-5 h-5" />
                            </button>
                            <button onClick={() => handleEditUser(user)} className="text-gray-600 hover:text-black">
                              <img src="/pencil.svg" alt="Editar" className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="w-1/3 bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">{editingUserId ? 'Editar Usuario' : 'Agregar Usuario'}</h2>
            <hr className="mb-4" />
            <div className="mb-4">
              <input
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 rounded w-full mb-4 text-gray-700"
              />
              <input
                type="text"
                placeholder="Apellido"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                className="border p-2 rounded w-full mb-4 text-gray-700"
              />
            </div>
            <input
              type="email"
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded w-full mb-4 text-gray-700"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded w-full mb-4 text-gray-700"
            />
            <div className="flex items-center mb-4">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={() => setIsActive(!isActive)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer dark:bg-gray-700 peer-checked:bg-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"></div>
                <span className="ml-3 text-gray-700">Activo</span>
              </label>
            </div>
            <button
              onClick={editingUserId ? updateUser : handleCreateUser}
              className="bg-purple-600 text-white py-2 px-4 rounded w-full"
            >
              Guardar
            </button>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
