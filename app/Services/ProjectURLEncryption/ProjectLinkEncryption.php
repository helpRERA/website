<?php

namespace App\Services\ProjectURLEncryption;

class ProjectLinkEncryption
{

    private string $key = '';

    public function __construct()
    {
        $this->key = config('app.enc_key', '');
    }

    public function getEncryptedLink(
        string|int|null $projectId,
        string|int|null $roleId,
        string|int|null $userId,
        string|int|null $divisionId,
        string|int|null $appId
    ): string
    {

        $plainText = $this->getPrintUrl($projectId, $roleId, $userId, $divisionId, $appId);

        // Generate random string with length 8

        $randomString = substr(str_shuffle('ABCDEFGHIJKLMNOPQRSTUVWXYZ'), 0, 8);

        // Concatenate random strings with plain text and current date/time
        $joinedPlainText = $randomString
            . "[" . $plainText
            . "[" . date('Y-m-d H:i:s');

        $encryptedValue = openssl_encrypt(
            $joinedPlainText,
            'DES',
            substr($this->key, 0, 8),
            OPENSSL_RAW_DATA,
            openssl_random_pseudo_bytes(8)
        );

        if ($encryptedValue === false) {
            return '';
        }

        return base64_encode($encryptedValue);
    }

    private function getPrintUrl(
        string|int|null $projectId,
        string|int|null $roleId,
        string|int|null $userId,
        string|int|null $divisionId,
        string|int|null $appId
    ): string
    {
        return "ProjectID=$projectId?Division=$divisionId?UserID=$userId?RoleID=$roleId?AppID=$appId?"
            . "Action=SEARCH?CharacterD=98?ExtAppID=null";
    }

    public function decryptLink(string $encryptedLink): string
    {
        $url = urldecode($encryptedLink);
        $result = openssl_decrypt(
            base64_decode($url),
            'DES',
            substr($this->key, 0, 8),
            OPENSSL_RAW_DATA,
            openssl_random_pseudo_bytes(8)
        );

        if ($result === false) {
            return openssl_error_string();
        }

        return $result;

    }


}
