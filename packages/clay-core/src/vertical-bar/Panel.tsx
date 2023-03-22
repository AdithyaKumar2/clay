/**
 * SPDX-FileCopyrightText: © 2022 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: BSD-3-Clause
 */

import classNames from 'classnames';
import React, {useContext, useEffect, useRef} from 'react';
import {CSSTransition} from 'react-transition-group';

import {ContentContext} from './Content';
import {Resizer} from './Resizer';
import {VerticalBarContext} from './context';

function useIsFirstRender(): boolean {
	const isFirst = useRef(true);

	if (isFirst.current) {
		isFirst.current = false;

		return true;
	}

	return isFirst.current;
}

type Props = {
	/**
	 * The panel content.
	 */
	children: React.ReactNode;

	/**
	 * Internal property.
	 * @ignore
	 */
	keyValue?: React.Key;

	/**
	 * Indicates whether the panel can be focused.
	 */
	tabIndex?: number;
};

export function Panel({children, keyValue, tabIndex}: Props) {
	const {activePanel, id, panelWidth, panelWidthMax, panelWidthMin, resize} =
		useContext(VerticalBarContext);
	const {displayType} = useContext(ContentContext);

	const isFirst = useIsFirstRender();

	const nodeRef = useRef<HTMLDivElement | null>(null);

	const previousActivePanelRef = useRef<React.Key | null>(null);

	useEffect(() => {
		previousActivePanelRef.current = activePanel;
	}, [activePanel]);

	return (
		<CSSTransition
			aria-labelledby={`${id}-tab-${keyValue}`}
			className={classNames('sidebar', {
				'c-slideout-show': activePanel === keyValue && isFirst,
				'sidebar-dark-l2': displayType === 'dark',
				'sidebar-light': displayType === 'light',
			})}
			classNames={{
				enter: 'c-slideout-transition c-slideout-transition-in',
				enterActive: 'c-slideout-show',
				enterDone: 'c-slideout-show',
				exit: 'c-slideout-transition c-slideout-transition-out',
			}}
			id={`${id}-tabpanel-${keyValue}`}
			in={activePanel === keyValue}
			nodeRef={nodeRef}
			role="tabpanel"
			tabIndex={tabIndex}
			timeout={
				(activePanel !== null &&
					previousActivePanelRef.current === null) ||
				(activePanel === null &&
					previousActivePanelRef.current !== null)
					? {enter: 300, exit: 200}
					: 0
			}
			unmountOnExit
		>
			<div
				ref={nodeRef}
				style={{
					width: panelWidth,
				}}
			>
				{children}

				{resize && (
					<Resizer
						aria-controls={`${id}-tabpanel-${keyValue}`}
						aria-orientation="vertical"
						aria-valuemax={panelWidthMax}
						aria-valuemin={panelWidthMin}
						aria-valuenow={panelWidth}
						className="c-horizontal-resizer"
						nodeRef={nodeRef}
					/>
				)}
			</div>
		</CSSTransition>
	);
}
