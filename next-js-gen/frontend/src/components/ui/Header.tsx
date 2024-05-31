'use client';
import React, { useEffect } from 'react';
import useAuthStore from '@/store/useAuthStore';
import { Button } from 'baseui/button';
import { checkToken } from '@/utils/auth';
import useModalStore from '@/store/useModalStore';
import Link from 'next/link';

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
    <div className="fixed left-0 top-0 z-10 flex h-[80px] w-screen items-center bg-gray-medium">
      <div className="container mx-auto px-[1rem]">
        <div className="flex h-full items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-extraLarge font-bold text-white">
              Next<span className="text-small font-light">.Gen</span>
            </h1>
          </div>
          <div className="flex grow justify-between pl-[50px]">
            <nav className="flex items-center gap-[20px]">
              <Link className="text-white" href="/">
                Home
              </Link>
              <Link className="text-white" href="/projects">
                Projects
              </Link>
            </nav>
            <div className="flex gap-[20px]">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
