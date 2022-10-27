/**
 * SPDX-FileCopyrightText: © 2019 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: BSD-3-Clause
 */

import React from 'react';

type Context = {
	close: () => void;
	closeOnClick: boolean;
	filterKey?: string;
	onSearch: (value: string) => void;
	search: string;
};

export const DropDownContext = React.createContext<Context>({
	close: () => {},
	closeOnClick: false,
} as Context);
