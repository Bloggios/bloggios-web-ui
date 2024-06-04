/*
 * Copyright © 2023-2024 Rohit Parihar and Bloggios
 * All rights reserved.
 * This software is the property of Rohit Parihar and is protected by copyright law.
 * The software, including its source code, documentation, and associated files, may not be used, copied, modified, distributed, or sublicensed without the express written consent of Rohit Parihar.
 * For licensing and usage inquiries, please contact Rohit Parihar at rohitparih@gmail.com, or you can also contact support@bloggios.com.
 * This software is provided as-is, and no warranties or guarantees are made regarding its fitness for any particular purpose or compatibility with any specific technology.
 * For license information and terms of use, please refer to the accompanying LICENSE file or visit http://www.apache.org/licenses/LICENSE-2.0.
 * Unauthorized use of this software may result in legal action and liability for damages.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and limitations under the License.
 */

import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ProfileState {
    name: string | null;
    bio?: string | null;
    email?: string | null;
    username?: string | null;
    profileImage?: string | null;
    followers?: number;
    following?: number;
    userId?: string | null;
    link?: string | null;
    badge?: boolean;
    userBadge?: string;
    profileTag?: string | null;
}

// Define the initial state
const initialState: ProfileState = {
    name: null,
};

// Define the payload type for setProfile action
interface SetProfilePayload {
    name: string | null;
    bio?: string | null;
    email?: string | null;
    username?: string | null;
    profileImage?: string | null;
    followers?: number;
    following?: number;
    userId?: string | null;
    link?: string | null;
    badge?: boolean;
    userBadge?: string;
    profileTag?: string | null;
}

// Create the slice
const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<SetProfilePayload>) => {
            const {
                name,
                bio,
                email,
                username,
                profileImage,
                followers,
                following,
                userId,
                link,
                badge,
                userBadge,
                profileTag
            } = action.payload;
            state.name = name;
            state.bio = bio;
            state.email = email;
            state.username = username;
            state.profileImage = profileImage;
            state.followers = followers;
            state.following = following;
            state.userId = userId;
            state.link = link;
            state.badge = badge;
            state.userBadge = userBadge;
            state.profileTag = profileTag;
        },
        clearProfile: (state) => {
            state.name = null;
            state.bio = null;
            state.email = null;
            state.username = null;
            state.profileImage = null;
            state.followers = undefined;
            state.following = undefined;
            state.userId = null;
            state.link = null;
            state.badge = undefined;
            state.userBadge = undefined;
            state.profileTag = null;
        }
    }
});

export default profileSlice.reducer;
export const {setProfile, clearProfile} = profileSlice.actions;
export type {ProfileState}