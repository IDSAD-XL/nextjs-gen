'use client';
import React, { useEffect } from 'react';
import useAuthStore from '@/store/useAuthStore';
import { Button } from 'baseui/button';
import { checkToken } from '@/utils/auth';
import useModalStore from '@/store/useModalStore';

const Header: React.FC = () => {
  const { isAuthenticated, setAuth, logout } = useAuthStore();
  const { openAuthModal, openRegisterModal } = useModalStore();

  useEffect(() => {
    const validateToken = async () => {
      const result = await checkToken();
      if (result) {
        setAuth(result.token, result.user);
      }
    };
    validateToken();
  }, [setAuth]);

  return (
    <div className="fixed left-0 top-0 z-10 h-[80px] w-screen bg-gray-medium">
      <div className="container mx-auto px-[1rem]">
        <div className="flex h-full items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-extraLarge font-bold text-white">Logo</h1>
          </div>
          <nav className="flex gap-[20px]">
            {!isAuthenticated && (
              <>
                <div>
                  <Button
                    size={'compact'}
                    kind={'secondary'}
                    onClick={openAuthModal}
                  >
                    Login
                  </Button>
                </div>
                <div>
                  <Button
                    size={'compact'}
                    kind={'secondary'}
                    onClick={openRegisterModal}
                  >
                    Register
                  </Button>
                </div>
              </>
            )}
            {isAuthenticated && (
              <Button size={'compact'} kind={'secondary'} onClick={logout}>
                Logout
              </Button>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
